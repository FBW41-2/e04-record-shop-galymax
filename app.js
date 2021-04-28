/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const getId = require('./middleware/getId')

const mongoose = require('mongoose')
require('dotenv').config()

/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');
const { setCors } = require("./middleware/security");

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));

/** ENV VARIABLES **/
const dBURL = process.env.DB_URL
const dBPassword = process.env.DB_PASSWORD
const dBUser = process.env.DB_USER


/** CONNECT TO MONGODB **/
mongoose.connect(`mongodb+srv://${dBUser}:${dBPassword}@${dBURL}`, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("connected!")
})


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);
app.use(getId)

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));


/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);

/** ERROR HANDLING */
app.use(function (req, res, next) {
    const error = new Error('Looks like something broke...');
    error.status = 400;
    next(error);
});

app.use(function (err, req, res, next) {
    res.send({
        error: {
            message: err.message
        }
    });
});


/** EXPORT PATH */
module.exports = app;
