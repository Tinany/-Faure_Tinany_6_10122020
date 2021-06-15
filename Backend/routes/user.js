//Express
const express = require('express');
const router = express.Router();

//Validator
const {checkSignUp} = require('../middleware/validator');

//User controllers
const userController = require('../controllers/user');

//Route Users :
router.post('/signup', checkSignUp, userController.signup);
router.post('/login', userController.login);

module.exports = router;