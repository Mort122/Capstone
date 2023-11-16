const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const controllers = require('../controllers');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
  // console.log('Attempting to log in with:', emailId);

  try {
    const user = await User.findOne({ where: { emailId: emailId } });
    if (user) {
      console.log('User found in database, comparing passwords...');
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log('Password match, creating token...');
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_secret_key');
        res.json({ token });
      } else {
        console.log('Password mismatch');
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      console.log('No user found with email:', emailId);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});


router.post('/signup', async (req, res) => {
 return controllers.userController.createUsers(req, res);
});

module.exports = router;
