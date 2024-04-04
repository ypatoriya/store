const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = productController;

// Create a new product
router.post('/products', createProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a specific product by ID
router.get('/products/:id', getProductById);

// Update a product
router.put('/products/:id', updateProduct);

// Delete a product
router.delete('/products/:id', deleteProduct);

module.exports = router;
