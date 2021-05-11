/** EXTERNAL DEPENDENCIES */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//const faker = require("faker")
require("dotenv").config();
//const { userValidators } = require("express-validator")
//var validator = require('validator');
 
/** ROUTERS */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");
const { setCors } = require("./middleware/security");
 
/** INIT */
const app = express();
//app.use(userValidators)
 
/** LOGGING */
app.use(logger("dev"));
//app.use(validator());

/**CONNECT TO DB */
/**CONNECT TO DB */
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbURL = process.env.DB_URL
const localDbURI = "mongodb://localhost:27017/record-shop"
const atlasURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbURL}`
mongoose.connect(
        process.env.NODE_ENV == 'autograding' ? localDbURI : atlasURI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
});
 
/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);
 
/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));
 
/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);
 
/** ERROR HANDLING */
app.use(function(req, res, next) {
 const error = new Error("Looks like something broke...");
 error.status = 400;
 next(error);
});
 
app.use(function(err, req, res, next) {
 res.status(err.status || 500).send({
 error: {
 message: err.message
 }
 });
});
 
/** EXPORT PATH */
module.exports = app;