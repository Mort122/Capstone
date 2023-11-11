const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.get('/', mealController.getAllMeals);
router.get('/:idMeal', mealController.getMealById);
router.post('/create', mealController.createMeal);
router.put('/update/:idMeal', mealController.updateMeal);

module.exports = router;