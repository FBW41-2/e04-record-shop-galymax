const { validationResult } = require("express-validator")

const checkValidaiton = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}
//                      Array of validators
const generateValidator = (validators) => {
    return [...validators, checkValidaiton]
}

module.exports = generateValidator