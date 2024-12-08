const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


// Add a menu item to the cart
router.post('/add', cartController.addToCart);

// Remove a menu item from the cart
router.delete('/remove', cartController.removeFromCart);
// Update the quantity of a menu item in the cart
router.put('/update', cartController.updateCartItemQuantity);
// Get all cart items for a user by user ID
router.get('/:userId', cartController.getCartItemsByUserId);



module.exports = router;