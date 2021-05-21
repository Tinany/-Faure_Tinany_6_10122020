//Express router
const express = require('express');
const router = express.Router();

// Mongoose models 
const Sauce = require('../models/Sauce');

//Middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Controllers
const sauceControllers = require('../controllers/sauce');

//Routes
router.post('/', auth, multer, sauceControllers.createSauce);
router.put('/:id', auth, multer, sauceControllers.updateSauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);
router.get('/', auth, sauceControllers.getAllSauces);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.post('/:id/like', auth, sauceControllers.saucesStatues);

module.exports = router; 
