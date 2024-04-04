
const { QueryTypes } = require('sequelize');

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, price, images } = req.body;
 
    const result = await sequelize.query(
      'INSERT INTO product (name, description, categoryId, price, images) VALUES (?, ?, ?, ?, ?)',
      {
        replacements: [name, description, categoryId, price, images],
        type: QueryTypes.INSERT
      }
    );

    res.json({ id: result[0] });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await sequelize.query(
      'SELECT * FROM product',
      { type: QueryTypes.SELECT }
    );
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
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

// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, categoryId, price, images } = req.body;
    
    await sequelize.query(
      'UPDATE product SET name = ?, description = ?, categoryId = ?, price = ?, images = ? WHERE id = ?',
      { replacements: [name, description, categoryId, price, images, productId], type: QueryTypes.UPDATE }
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a product
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

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };