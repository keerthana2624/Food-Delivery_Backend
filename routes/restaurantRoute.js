const express = require('express');
const restaurantController = require('../controllers/restaurantController')


const router = express.Router();

// add a new restaurant
router.post('/',restaurantController.addNewRestaurant);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/', restaurantController.getAllRestaurants);
router.put('/:id',restaurantController.updateRestaurant);
router.delete('/:id',restaurantController.deleteRestaurant);
module.exports = router;