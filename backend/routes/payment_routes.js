const express = require('express')
const { capturePayment, verifySignature, getMyOrders } = require('../controller/RazorPay')
const { auth, isCustomer } = require('../middleware/auth')

const router = express.Router()

router.post("/capture-payment", auth, isCustomer, capturePayment)
router.post("/verifySignature", auth, isCustomer, verifySignature)
router.get("/my-orders", auth, isCustomer, getMyOrders)
module.exports = router
