const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const axios = require('axios');
const dbConnect = require("./dbConnect");
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const authRoutes = require('./routes/authRoutes'); 
const mealController = require('./controllers/mealController');
const postRoutes = require('./routes/postRoutes');


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to mySQL application." });
});


app.get('/api/meals/:id', mealController.getMealById);


  

// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});