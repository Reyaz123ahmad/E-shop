const express = require('express')
const { OTP, signup, login, changePassword, forgotPassword, resetPassword } = require('../controller/auth_controller')
const { auth } = require('../middleware/auth')

const router = express.Router()
router.post('/send-otp', OTP)
router.post('/signup', signup)
router.post('/login', login)
router.post('/change-password', auth, changePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router