const Order = require('../models/Order')

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.getOrder = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
  res.json(order);

};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id)
  res.json(order);
};

exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const order = await Order.findByIdAndUpdate(id, dt, {new:true})
  res.json(order);
};

exports.addOrder = async (req, res, next) => {
  const order = await Order.create(req.body)

  res.json(order);
};
