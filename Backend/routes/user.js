
//Express
const express = require('express');
const router = express.Router();

//User controllers
const userController = require('../controllers/user');

//Route Users :
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;