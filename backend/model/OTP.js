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


otpSchema.pre('save', async function(next) {
    if(this.isNew){
        try {
            await emailService.otpEmailService(this.email, this.otp);
            next();
        } catch (error) {
            console.error("Email delivery failed inside schema pre-save:", error);
            next(error); 
        }
    } else {
        next();
    }
    
})

const OTP = mongoose.model("OTP", otpSchema)
module.exports = OTP