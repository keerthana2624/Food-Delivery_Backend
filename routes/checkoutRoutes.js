const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

// Checkout route
router.post('/', checkoutController.checkout);

module.exports = router;
