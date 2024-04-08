const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const verifyToken = require('../config/auth')
const fs = require('fs');
const path = require('path');

const generateToken = (user) => {
  const payload = { email: user.email, password: user.password };
  return jwt.sign(payload, 'crud', { expiresIn: '24h' });
};

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

    const [existingUser] = await sequelize.query('SELECT * FROM users WHERE email = ?',
      { replacements: [email], type: QueryTypes.SELECT });

    if (existingUser) {
      const user = existingUser;
      console.log(user);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = generateToken(user);
        return res.status(200).send({ message: 'Login success!', token: token });
      } else {
        return res.status(401).send({ message: 'Incorrect password!' });
      }
    } else {
      return res.status(404).send({ message: 'Email not found! Sign up!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error in login check api!',
      error
    });
  }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    const user = await sequelize.query(
      'SELECT * FROM users WHERE id = ?', {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    })

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
  try {
      console.log(req.files)
      let id = req.params.id  
      let image = req.files.profile_pic //key and auth


      // if(image.length>1){
      //     throw new error('multiple file not allowed!')
      // }
 
      const dirExists = fs.existsSync(`public/assets/`);
      
      if (!dirExists) {
          fs.mkdirSync(`public/assets/`, { recursive: true });
      }

      if (image == undefined || image == null) throw new Error("file not found!");

     // let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`
     
     let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`
      image.mv(path.join(__dirname, ".." + savePath), async (err) => {
          if (err) throw new Error("error in uploading")

          else {
            const updateQuery = 'UPDATE users SET profile_pic = :profile_pic WHERE id = :id';

            await sequelize.query(updateQuery, {
              replacements: { profile_pic: savePath, id: id },
              type: sequelize.QueryTypes.UPDATE
            });
          }
      });
       
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error in file upload api!' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getImage
};
