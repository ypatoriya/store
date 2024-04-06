const express = require('express');
const router = express.Router();

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');

// Create a new category
router.post('/category', createCategory);

// Get all categories
router.get('/category', getAllCategories);

// Get a specific category by ID
router.get('/category/:id', getCategoryById);

// Update a category
router.put('/category/:id', updateCategory);

// Delete a category
router.delete('/category/:id', deleteCategory);

module.exports = router;
