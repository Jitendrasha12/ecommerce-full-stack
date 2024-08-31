const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
     
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
     
    },
    count: {
      type: String,
     
    },
    amount: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  },
)

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart
