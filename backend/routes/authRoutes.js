const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../dbPool');

const router = express.Router();

// Login endpoint

router.post('/login', (req, res) => {
    const { emailId: email, password } = req.body; 
  
    // Query to find the user by email
    const query = 'SELECT * FROM users WHERE email = ?'; 
    pool.query(query, [email], async (error, results) => { // Pass the email to the query
      if (error) {
        res.status(500).json({ message: 'Something went wrong' });
      } else if (results.length > 0) {
        // Compare hashed password
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          // Create and send the token
          const token = jwt.sign({ userId: results[0].id }, 'your_secret_key');
          res.json({ token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  });


  router.post('/api/users/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    // Log the received data to ensure it's correct
    console.log('Received data:', { firstName, lastName, email, password });
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      pool.query(query, [firstName, lastName, email, hashedPassword], (error, results) => {
        if (error) {
          console.error('SQL Error:', error); // Log SQL errors here
          res.status(500).json({ message: 'Error while creating user', error: error.sqlMessage });
        } else {
          res.status(201).json({ message: 'User created successfully' });
        }
      });
    } catch (error) {
      console.error('Server Error:', error); // Log server errors here
      res.status(500).json({ message: 'Server error during sign up', error: error.message });
    }
  });


  module.exports = router;