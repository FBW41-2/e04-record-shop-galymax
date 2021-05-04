const User = require('../models/User')

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if(err) return console.error(err)
    res.json(user)
  })
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id)
  res.json(user);
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const user = await User.findByIdAndUpdate(id, dt,{new:true})
  res.json(user);
};

exports.addUser = async (req, res, next) => {
  const user = req.body;
  await User.create(user)

  res.json(user);
};
