const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const { verifyToken } = require('../config/auth');
const { registerUser, loginUser, getUserProfile, getImage } = userController;


//create product
const createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, price } = req.body;
    const images = req.files ? Object.values(req.files) : [];
    console.log(req.body)

    const createdBy = req.user.id

    const result = await sequelize.query(
      'INSERT INTO product (name, description, categoryId, price, createdBy) VALUES (?, ?, ?, ?, ?)',
      {
        replacements: [name, description, categoryId, price, createdBy],
        type: QueryTypes.INSERT
      }
    );

    const productId = req.params.id

    for (const image of images) {
      await sequelize.query(
        'INSERT INTO product_images (product_id, image_path) VALUES (?, ?)',
        { replacements: [productId, image.name], type: QueryTypes.INSERT }
      );
    }

    res.json({ message: 'Product created!', id: result[0] });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// all products
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const products = await sequelize.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.categoryId,
        p.price,
        (SELECT pi.image_path
         FROM product_images pi
         WHERE pi.product_id = p.id) AS images
      FROM product p`,
      { type: QueryTypes.SELECT }
    );
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await sequelize.query(
      'SELECT * FROM product WHERE id = ?',
      { replacements: [productId], type: QueryTypes.SELECT }
    );
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, categoryId, price, images } = req.body;

    await sequelize.query(
      'UPDATE product SET name = ?, description = ?, categoryId = ?, price = ?, images = ? WHERE id = ?',
      { replacements: [name, description, categoryId, price, images, productId] }
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await sequelize.query(
      'DELETE FROM product WHERE id = ?',
      { replacements: [productId], type: QueryTypes.DELETE }
    );
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//search
const searchProducts = async (req, res) => {
  try {

    const { name } = req.query;
    console.log(name);

    if (!name) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await sequelize.query(
      `SELECT p.*, c.categoryName AS categoryName
       FROM product p
       LEFT JOIN category c ON p.categoryId = c.id
       WHERE LOWER(p.name) LIKE :query
         OR LOWER(p.description) LIKE :query
         OR CAST(p.categoryId AS CHAR) LIKE :query
         OR CAST(p.price AS CHAR) LIKE :query`,
      {
        replacements: { query: `%${name.toLowerCase()}%` },
        type: QueryTypes.SELECT,
      }
    );

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts };