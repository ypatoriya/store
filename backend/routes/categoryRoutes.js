const express = require('express');
const router = express.Router();

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');

// Create a new category
router.post('/categories', createCategory);

// Get all categories
router.get('/categories', getAllCategories);

// Get a specific category by ID
router.get('/categories/:id', getCategoryById);

// Update a category
router.put('/categories/:id', updateCategory);

// Delete a category
router.delete('/categories/:id', deleteCategory);

module.exports = router;
