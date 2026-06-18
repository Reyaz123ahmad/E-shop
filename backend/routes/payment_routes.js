const express = require('express')
const { capturePayment, verifyPayment, verifySignature, getMyOrders } = require('../controller/RazorPay')
const { auth, isCustomer } = require('../middleware/auth')

const router = express.Router()

router.post("/capture-payment", auth, isCustomer, capturePayment)
router.post("/verify-payment", auth, isCustomer, verifyPayment)
router.post("/verifySignature", verifySignature)
router.get("/my-orders", auth, isCustomer, getMyOrders)
module.exports = router
