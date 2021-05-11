const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const userValidators = require("../lib-validator/userRules")
const generatorValidator = require("../middleware/validator")


const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post( generatorValidator(userValidators), addUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
