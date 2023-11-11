const express = require("express");
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
require("dotenv").config();
const dbConnect = require("./dbConnect");
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const authRoutes = require('./routes/authRoutes');

// parse requests of content-type - application/json
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/users', authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to mySQL application." });
});

  

// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});