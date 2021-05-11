const { validationResult } = require("express-validator")

const chekValidator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    else{
        next()
    }
}

const generatorValidator = (validator) =>{
    return [...validator, chekValidator]
}

module.exports = generatorValidator 