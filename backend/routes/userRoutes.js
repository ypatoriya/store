const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { registerUser, loginUser, getUserProfile } = userController; 

// Register a new user
router.post('/users/register', registerUser);

// Login
router.post('/users/login', loginUser);

// Get user profile
router.get('/users/profile', getUserProfile);

module.exports = router;
