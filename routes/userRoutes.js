const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register',userController.register);
router.post('/login', userController.login);
// business logic will go inside controller

module.exports = router;