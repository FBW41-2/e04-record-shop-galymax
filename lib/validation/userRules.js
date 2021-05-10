const { body } = require('express-validator')
const validator = require('validator')


module.exports = [
    body('email')
        .isEmail()
        //sanitization
        .normalizeEmail()
        .withMessage("This is not a vilid email address"),
    body('password')
        .custom((value, { req }) => {
            const score = validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })
        
            console.log("score", score)
        })
        .withMessage("This password is not secure enough"),
    body('firstName')
        .exists()
        // sanitization
        .trim()
        .withMessage("Please provide your first name")
]