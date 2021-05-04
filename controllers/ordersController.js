const Order = require('../models/Order')
const createError = require('http-errors')

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if(!orders) throw new createError.NotFound()
    res.json(orders)
  } catch (error) {
    next(error)
  }
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
