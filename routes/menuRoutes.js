const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// Route to add a new menu item
router.post('/', menuController.addMenuItem);



module.exports = router;