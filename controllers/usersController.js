const User = require('../models/User')

exports.getUsers = (req, res, next) => {
  const users = db.get("users").value();
  res.status(200).send(users);
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if(err) return console.error(err)
    res.json(user)
  })
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  const user = db
    .get("users")
    .remove({ id })
    .write();
  res.status(200).send(user);
};

exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const user = db
    .get("users")
    .find({ id })
    .assign(dt)
    .write();
  res.status(200).send(user);
};

exports.addUser = (req, res, next) => {
  const user = req.body;
  db.get("users")
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(user);
};
