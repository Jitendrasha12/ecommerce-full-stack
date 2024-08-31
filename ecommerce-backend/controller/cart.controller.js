const Cart = require('../models/Cart')
const {sendResponseError} = require('../middleware/middleware')

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({userId: req.user._id}).populate('productId')
    // console.log(carts)
    res.status(200).send({status: 'ok', carts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;
  try {
    // Find the existing cart item for the user and product
    let cart = await Cart.findOne({ productId, userId: req.user._id });

    if (cart) {
      // Update the existing cart item
      cart.count += count;
      // Optionally, update the amount if needed
      // cart.amount = cart.count * productPrice; // Calculate based on your logic
      await cart.save();
    } else {
      // Create a new cart item
      cart = new Cart({
        productId,
        count,
        userId: req.user._id,
        // Optionally, set initial amount if needed
        // amount: count * productPrice // Calculate based on your logic
      });
      await cart.save();
    }

    res.status(201).send({ status: 'ok', cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const deleteProductInCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndRemove(req.params.id)
    res.status(200).send({status: 'ok'})
  } catch (err) {
    console.log(err)
    return next(err)
   // sendResponseError(500, `Error ${err}`, res)
  }
}
module.exports = {addProductInCart, deleteProductInCart, getCartProducts}
