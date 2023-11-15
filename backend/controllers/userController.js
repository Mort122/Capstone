"use strict";

const { User } = require("../models"); // Destructure to get the User model directly if it's available like this.
const bcrypt = require('bcrypt');

const getUsers = (res) => {
    Models.User.findAll({}).then(function (data) {
        res.send({result: 200 , data: data})
    }).catch(err => {
        throw err
    })
}

const createUsers = async (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;



    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed password", hashedPassword);
      // Create user with Sequelize
      console.log('creatingUser!', User.create);

      const newUser = await User.create({
        firstName,
        lastName,
        emailId,
        password: hashedPassword
      });

      res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
      console.error('Error during sign up: ', error);
      res.status(500).json({ message: 'Error during sign up', error: error.message });
    }

}


module.exports = {
    getUsers, 
    createUsers
}