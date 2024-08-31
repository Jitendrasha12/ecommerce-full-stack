const express = require('express')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

const {
    CreateOrder,verifyPayment
  } = require("../controller/order.controller");

router.post('/create-order', CreateOrder)
router.post('/verify-payment',verifyPayment)

module.exports = router