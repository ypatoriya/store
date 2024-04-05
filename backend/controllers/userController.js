const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// Function to register a new user
const registerUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password, gender, hobbies, userRole, profile_pic } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const result = await sequelize.query(
      'INSERT INTO users (firstName, lastName, email, password, gender, hobbies, userRole, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [firstName, lastName, email, hashedPassword, gender, hobbies, userRole, profile_pic],
        type: QueryTypes.INSERT
      }
    );
    res.json({ message: `User created!` });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const [existingUser] = await sequelize.query(
      'SELECT * FROM users WHERE email = ?', { replacements: [email], type: QueryTypes.SELECT }
    );  

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                //const token = generateToken(user);
                //return res.status(200).send({ message: 'Login success!', token: token });
                return res.status(200).send({ message: 'Login success!' });
            } else {
                return res.status(401).send({ message: 'Incorrect password!' });
            };
        } else {
            return res.status(404).send({ message: 'Email not found! Sign up!' });
        }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; 
    console.log(`userId: ${userId}`); 
    const user = await sequelize.query(
      'SELECT * FROM users WHERE id = ?',  { 
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT})

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getImage = async (req, res) => {
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getImage
};
