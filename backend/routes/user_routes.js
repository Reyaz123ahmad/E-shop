const express = require('express')
const { OTP, signup, login, changePassword, forgotPassword, resetPassword } = require('../controller/auth_controller')
const {getProfile, updateProfile, deleteAccount} = require('../controller/user_controller')
const { auth } = require('../middleware/auth')

const router = express.Router()
router.post('/send-otp', OTP)
router.post('/signup', signup)
router.post('/login', login)
router.post('/change-password', auth, changePassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/account', auth, deleteAccount);

module.exports = router