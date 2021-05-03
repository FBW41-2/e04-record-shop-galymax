/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql')
const sqlconfig = require('./config/sql')

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

exports.sqlconfig = sqlconfig

/** DATABASE CONNECTION */
var con = mysql.createConnection(sqlconfig);
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /*var sql = "SELECT * FROM records";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });*/
});



/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

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
