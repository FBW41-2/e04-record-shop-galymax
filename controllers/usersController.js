const User = require("../models/User");
const createError = require("http-errors");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const tokens = {}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .sort("lastName")
      .limit(5);
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  const token = req.headers['x-auth']
  const userData = req.body
  // is the request coming from a logged in user?
  // Find the user with provided key
  const loggedInUser = await User.findOne({token: token})
  console.log("token", token)
  if(!token || !loggedInUser) {
    return next({message: "Permission denied. You have to log in"})
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, userData, {
      new: true,
      runValidators: true
    });
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    const token = crypto.randomBytes(30).toString('hex')
    user.password = await bcrypt.hash(user.password, 10)
    user.token = token
    await user.save();
    res
      .set({
        'x-auth': token
      })
      .json(user);
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  const userCredentials = req.body
  let user
  let isCorrectPassword
  console.log(userCredentials)
  try {
    user = await User.findOne({email: userCredentials.email}).select("+password")
    console.log("DB User Pssword", user.password, userCredentials.password)
    const password = user.password
    isCorrectPassword = await bcrypt.compare(userCredentials.password, password)
  } catch (error) {
    next(error)
  }
  
  if(isCorrectPassword) {
    // generate random string
    const token = crypto.randomBytes(30).toString('hex')
    // store key in user DB entry
    await User.findByIdAndUpdate(user.id, {token: token})
    res
      .set({
        'x-auth': token
      })
      .json({message: "Congrats! You are logged in!"})
  } else {
    next({message: "Wrong password"})
  }
}
