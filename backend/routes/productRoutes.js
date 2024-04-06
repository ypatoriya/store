const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts} = productController;

// Create a new product
router.post('/createProducts', createProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a specific product by ID
router.get('/productById/:id', getProductById);

// Update a product 
router.put('/updateProduct/:id', updateProduct);

// Delete a product
router.delete('/deleteProducts/:id', deleteProduct);

// Search products
router.get('/search', searchProducts);

module.exports = router;
