// const mongoose = require('mongoose')
// const emailService = require('../emailService/mailsender')

// const otpSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     otp: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 300 // OTP expires after 5 minutes (300 seconds)
//     }


// })


// // ✅ CORRECT (Async function me next parameter aur next() call mat rakho)
// otpSchema.pre("save", async function() {
//     if (this.isNew) {
//         await emailService.otpEmailService(this.email, this.otp);
//     }
// });
    


// const OTP = mongoose.model("OTP", otpSchema)
// module.exports = OTP












const mongoose = require('mongoose');
const emailService = require('../emailService/mailsender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP 5 minute (300s) me auto-delete ho jayega
    }
});

// Send verification email before saving document
otpSchema.pre("save", async function () {
    if (this.isNew) {
        try {
            await emailService.otpEmailService(this.email, this.otp);
        } catch (error) {
            console.error("Email delivery failed inside schema pre-save:", error.message);
            throw error; // Database me OTP save hone se rokne ke liye error throw karein
        }
    }
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;