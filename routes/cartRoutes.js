const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


// Add a menu item to the cart
router.post('/add', cartController.addToCart);

module.exports = router;