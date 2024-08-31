const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  receipt: {
    type: String, 
  },
  status: {
    type: String,
    default: 'created',
  },
  shippingAddress:{
    type: String,
  },
  paymentMethod:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
