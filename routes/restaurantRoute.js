const express = require('express');
const restaurantController = require('../controllers/restaurantController')
const router = express.Router();

router.post('/',restaurantController.addNewRestaurant);

// business logic will go inside controller

module.exports = router;