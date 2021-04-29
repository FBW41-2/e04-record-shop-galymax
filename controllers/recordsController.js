const Record = require('../models/Record')

// get all records
// http://localhost:3000/records/?pageNumber=0&recordsPerPage=6&sortField=price&sortOrder=-1&searchField=title&search=
exports.getRecords = (req, res, next) => {
    const { pageNumber, recordsPerPage, sortOrder, sortField, searchField, search } = req.query
    // access db
    Record.find({[searchField]: {$regex: search, $options: 'i'}}, (err, records) => {
      if (err) return console.error(err);
      res.json(records)
    })
    .limit(Number(recordsPerPage))
    // start from apecific entry number
    .skip(pageNumber * recordsPerPage)
    .sort({[sortField]: sortOrder})
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