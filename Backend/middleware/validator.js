const {validationResult, check} = require('express-validator');

exports.checkSignUp = [
    check('email').isEmail().trim(),
    check('password').isLength({min: 8}),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]

exports.checkSauceInfo = [
    check('name').isAlpha('fr-FR', {ignore: ' '}),
    check('manufacturer').isAlpha('fr-FR', {ignore: ' '}),
    check('description').isAlpha('fr-FR', {ignore: ' '}),
    check('mainPepper').isAlpha('fr-FR', {ignore: ' '}),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()})
        }
        next();
    }
]

exports.parse = (req, res, next) => {
    if (req.body.sauce) {
        req.body = JSON.parse(req.body.sauce)
    }
    next()
}