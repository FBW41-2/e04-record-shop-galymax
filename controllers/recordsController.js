const Record = require('../models/Record')

// get all records
exports.getRecords = (req, res, next) => {
    // access db
    Record.find((err, records) => {
      if (err) return console.error(err);
      res.json(records)
    })
}

// get specific record
exports.getRecord = (req, res, next) => {
    const { id } = req.params;
    console.log("get record", req.id)
    Record.findById(id, (err, entry) => {
      if (err) return res.json({error: err});
      res.json(entry)
    })
}

// delete one record
exports.deleteRecord = (req, res, next) => {
    const { id } = req.params;
    Record.findByIdAndRemove(id, (err, entry) => {
      if (err) return res.json({error: err});
      res.json({deleted: entry})
    })
}

// update one record
exports.updateRecord = (req, res, next) => {
    const { id } = req.params;
    Record.findByIdAndUpdate(id, req.body, {new: true}, (err, entry) => {
      if (err) return res.json({error: err});
      res.json(entry)
    })
}

// create new record
exports.addRecord = (req, res, next) => {
    // create new record
    Record.create(req.body, (err, entry) => {
      if (err) return res.json({error: err});
      res.json(entry)
    })
} 