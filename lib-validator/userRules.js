const validator = require("validator")
const { body } = require("express-validator")

// validator function
module.exports= [
    body("email")
    .isEmail()
    // sanitization
    .normalizeEmail() 
    .withMessage(`Incorrect email mate ¯\_(ツ)_/¯ `),
  body("password")
    .isStrongPassword()
    .withMessage(`Pass ain't secure enough mate ¯\_(ツ)_/¯ `),
  body("firstName")
    .exists() // check if data exists before running sanitization
    // sanitization
    .trim()
    .withMessage("Where yo first name mate!?!?"),
 
]