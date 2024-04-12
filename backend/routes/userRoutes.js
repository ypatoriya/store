const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile, getImage } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const {sendMail} = require('../controllers/cronController')
 
// Register a new user
router.post('/users/register', registerUser);

// Login
router.post('/users/login', loginUser);

// Get user profile by id
router.get('/users/profile',verifyToken, getUserProfile);

// Update user profile
router.post('/users/editProfile/:id', getImage);
 
//send mail
router.post('/users/sendMail', sendMail) 


module.exports = router;
