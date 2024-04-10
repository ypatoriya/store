const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');

// Create a new category
router.post('/createCategory', createCategory);

// Get all categories
router.get('/allCategory', getAllCategories);

// Get a specific category by ID
//router.get('/category/:id', getCategoryById);

// Update a category
router.put('/category/:id', updateCategory); 

// Delete a category
router.delete('/deleteCategory/:id', deleteCategory);

module.exports = router;
