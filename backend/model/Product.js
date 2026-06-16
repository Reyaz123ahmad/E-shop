const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    image:{
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }

}, {timestamps: true})

const Product = new mongoose.model("Product", productSchema)
module.exports = Product