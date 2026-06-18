const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city:{
        type: String,
    },
    pincode:{
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken:{
        type: String,
    },
    resetPasswordTokenExpires:{
        type: String
    },
    isDeleted: {
        type: String,
        required: true,
        default: false
    },

}, {timestamps: true})

const User = new mongoose.model("User", userSchema)
module.exports = User