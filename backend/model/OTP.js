const mongoose = require('mongoose')
const emailService = require('../emailService/mailsender')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires after 5 minutes (300 seconds)
    }


})


otpSchema.pre('save', async function() {
    if(this.isNew){
        await emailService.otpEmailService(this.email, this.otp)
    }
    
})

const OTP = mongoose.model("OTP", otpSchema)
module.exports = OTP