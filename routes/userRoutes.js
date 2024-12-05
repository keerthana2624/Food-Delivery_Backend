const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register',userController.register);

// business logic will go inside controller

module.exports = router;