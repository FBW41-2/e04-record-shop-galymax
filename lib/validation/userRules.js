const { body } = require('express-validator')
const validator = require('validator')


module.exports = [
    body('email')
        .isEmail()
        //sanitization
        .normalizeEmail()
        .withMessage("This is not a vilid email address"),
    body('password')
        .isStrongPassword()
        .withMessage("This password is not secure enough"),
    body('firstName')
        .exists()
        // sanitization
        .trim()
        .withMessage("Please provide your first name")
]