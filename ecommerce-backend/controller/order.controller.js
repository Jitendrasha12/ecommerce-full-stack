const Order = require("../models/Order");
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

//   const CreateOrder = async (req, res) {
//     const { amount, currency } = req.body;
  
//     try {
//       // Create a new order
//       const options = {
//         amount: amount * 100, 
//         currency: currency || 'INR',
//         receipt: `receipt_${Math.random() * 1000}`,
//       };
//       const order = await razorpay.orders.create(options);
  
//       // Save the order to the database
//       const newOrder = new Order({
//         razorpayOrderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         receipt: options.receipt,
//         status: 'created',
//       });
  
//       await newOrder.save();
  
//       // Send order details to frontend
//       res.json({
//         id: order.id,
//         currency: order.currency,
//         amount: order.amount,
//       });
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ error: error.message });
//     }
//   };

  const CreateOrder = async (req, res) => {
    const { amount, currency,shippingAddress,paymentMethod } = req.body;
   
  
    try {
      // Create a new order
      const options = {
        amount: amount * 100, // Convert amount to the smallest currency unit (e.g., paise)
        currency: currency || 'INR',
        receipt: `receipt_${Math.random() * 1000}`, // Generate a random receipt ID
      };
      const order = await razorpay.orders.create(options); // Create the order with Razorpay
    
  
      // Save the order to the database
      const newOrder = new Order({
        razorpayOrderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: options.receipt,
        status: 'created',
        paymentMethod,
        shippingAddress

         // Initial status of the order
      });
  
      await newOrder.save(); // Save the order details to your database
  
      // Send order details to the frontend
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: error.message }); // Handle errors
    }
  };

  const verifyPayment = async(req,res,next)=>{
    const { paymentId } = req.body;

    try {
      // Fetch payment details from Razorpay
      const payment = await razorpay.payments.fetch(paymentId);
  
      // Check the payment status
      if (payment.status === 'captured') {
        // Payment is successful
        // Create or update order in your database
        res.json({ success: true });
      } else {
        // Payment failed
        res.json({ success: false, message: 'Payment verification failed.' });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }

  }
  

  module.exports = {CreateOrder,verifyPayment}
