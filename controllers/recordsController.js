const mongodb = require('mongodb')
const mysql = require('mysql')
const sqlconfig = require('../config/sql')

// get all records
exports.getRecords = (req, res, next) => {
    // access db from global object   // select all records
    const con = mysql.createConnection(sqlconfig);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * FROM records', (err, result) => {
          if(err) throw err
          res.json(result)
        })
    });
}

// get specific record
exports.getRecord = (req, res, next) => {
    const { id } = req.params;
    const con = mysql.createConnection(sqlconfig);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM records WHERE id = ${id}`, (err, result) => {
          if(err) throw err
          res.json(result)
        })
    });
}

// delete one record
exports.deleteRecord = (req, res, next) => {
    const { id } = req.params;
    const con = mysql.createConnection(sqlconfig);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query(`DELETE FROM records WHERE id = ${id}`, (err, result) => {
          if(err) throw err
          res.json(result)
        })
    });
}

// update one record
exports.updateRecord = (req, res, next) => {
    const { id } = req.params;
    const { price } = req.body
    const con = mysql.createConnection(sqlconfig);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query(`UPDATE records SET price = '${price}' WHERE id = ${id}`, (err, result) => {
          if(err) throw err
          res.json(result)
        })
    });
}

// create new record
exports.addRecord = (req, res, next) => {
    const { artist, albumtitle, year, price} = req.body;
    // access db from global object
    const con = mysql.createConnection(sqlconfig);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query(`INSERT INTO records (artist, albumname, year, price) VALUES ('${artist}', '${albumtitle}', '${year}', '${price}')`, (err, result) => {
          if(err) throw err
          res.json(result)
        })
    });
}