//Express router
const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Validator
const {checkSauceInfo, parse} = require('../middleware/validator');

//Controllers
const sauceControllers = require('../controllers/sauce');

//Routes
router.post('/', auth, multer, parse, checkSauceInfo, sauceControllers.createSauce);
router.put('/:id', auth, multer, parse, checkSauceInfo, sauceControllers.updateSauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);
router.get('/', auth, sauceControllers.getAllSauces);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.post('/:id/like', auth, sauceControllers.saucesStatues);

module.exports = router;