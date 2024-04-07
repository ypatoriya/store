const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { registerUser, loginUser, getUserProfile, getImage } = userController; 

// Register a new user
router.post('/users/register', registerUser);

// Login
router.post('/users/login', loginUser);

// Get user profile by id
router.get('/users/profile/:id', getUserProfile);

// Update user profile
router.put('/users/editProfile/:id', getImage);

module.exports = router;
