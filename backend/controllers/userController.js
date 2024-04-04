
const { QueryTypes } = require('sequelize');

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, hobbies, userRole, profile_pic } = req.body;
    const result = await sequelize.query(
      'INSERT INTO users (firstName, lastName, email, password, gender, hobbies, userRole, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [firstName, lastName, email, password, gender, hobbies, userRole, profile_pic],
        type: QueryTypes.INSERT
      }
    );
    res.json({ id: result[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sequelize.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      { replacements: [email, password], type: QueryTypes.SELECT }
    );
    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await sequelize.query(
      'SELECT * FROM users WHERE id = ?',
      { replacements: [userId], type: QueryTypes.SELECT }
    );
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
