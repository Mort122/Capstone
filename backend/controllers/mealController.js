const axios = require('axios'); 
const Models = require('../models');
const { getApiMealIdByLocalId } = require('../models/meals');
const sequelizeInstance = require("../dbConnect").Sequelize; 


const getAllMeals = (req, res) => {
    console.log("Inside getAllMeals");
    const cuisine = req.query.cuisine || 'Italian'; 
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
        .then(response => { 
            console.log('data from api: ', response.data);

            const rawMeals = response.data.meals; 
            const mealPromises = rawMeals.map(meal => 
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            );

            return Promise.all(mealPromises);
        })
        .then(results => {
            const meals = results.map(({data}) => {
                const meal = data.meals[0];
                const {strMeal: name, strMealThumb: imageUrl, strInstructions: description, strArea: cuisine, idMeal: apiMealId} = meal;
                return {
                    name, 
                    imageUrl, 
                    description, 
                    cuisine,
                    apiMealId 
                };
            });

            // Check if meals already exist in the DB and create them if they do not
            return Promise.all(meals.map(mealData => {
                return Models.Meal.findOrCreate({
                    where: { name: mealData.name },
                    defaults: mealData
                }).then(([meal, created]) => {
                    return { ...meal.get({ plain: true }), apiMealId: mealData.apiMealId };
                });
            }));
        })
        .then(createdMeals => {
            // Populate or update meal_mapping table
            const mappingPromises = createdMeals.map(({ id, apiMealId }) => {
                if (apiMealId) {
                    const mappingQuery = 'INSERT INTO meal_mapping (localId, apiMealId) VALUES (?, ?) ON DUPLICATE KEY UPDATE apiMealId = ?';
                    return sequelizeInstance.query(mappingQuery, {
                        replacements: [id, apiMealId, apiMealId],
                        type: sequelizeInstance.QueryTypes.UPSERT
                    });
                }
            });

            // Return createdMeals along with the promise for mapping updates
            return Promise.all(mappingPromises).then(() => createdMeals);
        })
        .then(createdMeals => {
            // Now createdMeals is defined here
            res.send({ result: 200, data: createdMeals });
        })
        .catch(error => {
            console.error('Error in getAllMeals:', error);
            res.status(500).json({ message: error.message });
        });
};





//I need to pull the Id from my database instead of the api

// const getMealById = async (req, res) => {
//     const id = req.params.id; // Use the ID from your own database, not from TheMealDB API
//     try {
//         const meal = await Models.Meal.findByPk(id);
//         if (meal) {
//             res.json(meal);
//         } else {
//             res.status(404).json({ message: "Meal not found" });
//         }
//     } catch (error) {
//         console.error('Error fetching meal by ID:', error);
//         res.status(500).json({ message: error.message });
//     }
// };


//use my Id to look up meal by (API's) Id in database (idMeal) then query then send back to frontend 
const getMealById = async (req, res) => {
    const { localId } = req.params; // Use the local ID assigned by your server

    try {
        const apiMealId = await getApiMealIdByLocalId(localId);
        if (!apiMealId) {
            return res.status(404).json({ message: "No corresponding meal found in TheMealDB" });
        }

        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${apiMealId}`);
        // console.log('check apiMealId', apiMealId); this isnt returning anything
        if (response.data.meals && response.data.meals.length > 0) {
            const meal = response.data.meals[0];
            res.json(meal);
        } else {
            res.status(404).json({ message: "Meal not found in TheMealDB" });
        }
    } catch (error) {
        console.error('Error fetching meal by ID:', error);
        res.status(500).json({ message: error.message });
    }
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