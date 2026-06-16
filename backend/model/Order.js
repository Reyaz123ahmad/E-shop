const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    itemDescription: {
        type: String
    },
    totalAmount: {
        type: String
    },
    address: {
        street: String,
        pin: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true})

const Order = new mongoose.model("Order", orderSchema)
module.exports = Order