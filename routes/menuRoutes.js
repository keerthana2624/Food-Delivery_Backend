const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// Route to add a new menu item
router.post('/', menuController.addMenuItem);
// Route to get menu items by restaurant ID
router.get('/:restaurantId', menuController.getMenuItemsByRestaurantId);
// Route to update a menu item
router.put('/:menuItemId', menuController.updateMenuItem);


module.exports = router;