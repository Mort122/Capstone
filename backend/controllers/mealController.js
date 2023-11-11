const axios = require('axios'); 
const Models = require('../models');


const getAllMeals = (req, res) => {
    console.log("Inside getAllMeals");
    const cuisine = req.query.cuisine || 'Italian'; 
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
        .then(response => { 
            console.log('data from api: ', response.data);

            const rawMeals = response.data.meals; 
            const mealIds = rawMeals.map(({idMeal}) => idMeal);
            const mealPromises = mealIds.map(mealId => 
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            );

            return Promise.all(mealPromises).then(results => {
                const meals = results.map(({data}) =>  {
                    const meal = data.meals[0]

                    const {strMeal: name, strMealThumb: imageUrl, strInstructions: description, strArea: cuisine} = meal;
                    
                    return {
                        name, 
                        imageUrl, 
                        description, 
                        cuisine
                    }
                });

                // save to DB
                Models.Meal.bulkCreate(meals).then(data => {
                    res.send({result: 200, data })
                })
 
            }
            );
            
            
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};



//I need to pull the Id from my database instead of the api

const getMealById = (req, res) => {
    console.log("Inside getMealById for ID:", req.params.idMeal);
    const idMeal = req.params.idMeal;
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};


const createMeal = (req, res) => {
    const { name, description, cuisine, imageUrl } = req.body;
    
    Models.Meal.create({
        name,
        description,
        cuisine,
        imageUrl
    }).then(data => {
        res.send({ result: 200, data });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

const updateMeal = (req, res) => {
    const idMeal = req.params.idMeal;
    const updatedData = req.body;

    Models.Meal.update(updatedData, {
        where: {
            id: idMeal
        }
    }).then(() => {
        res.send({ result: 200, message: "Meal updated successfully." });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

module.exports = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal
};