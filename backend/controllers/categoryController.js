
const { QueryTypes } = require('sequelize');

// Function to create a new category
const createCategory = async (req, res) => {
  try {
    const { categoryname, createdBy } = req.body;
    const result = await sequelize.query(
      'INSERT INTO categories (categoryname, createdBy) VALUES (?, ?)',
      {
        replacements: [categoryname, createdBy],
        type: QueryTypes.INSERT
      }
    );
    // Return the ID of the newly created category
    res.json({ id: result[0] });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all categories
const getAllCategories = async (req, res) => {
  try {
    
    const categories = await sequelize.query(
      'SELECT * FROM categories',
      { type: QueryTypes.SELECT }
    );
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
 
    const category = await sequelize.query(
      'SELECT * FROM categories WHERE id = ?',
      { replacements: [categoryId], type: QueryTypes.SELECT }
    );
    if (category.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category[0]);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryname } = req.body;

    await sequelize.query(
      'UPDATE categories SET categoryname = ? WHERE id = ?',
      { replacements: [categoryname, categoryId], type: QueryTypes.UPDATE }
    );
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await sequelize.query(
      'DELETE FROM categories WHERE id = ?',
      { replacements: [categoryId], type: QueryTypes.DELETE }
    );
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory}