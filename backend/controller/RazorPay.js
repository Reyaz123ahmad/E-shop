const User = require('../model/User')
const Product = require('../model/Product')
const Order = require('../model/Order')
const crypto = require('crypto')
const { instance } = require('../config/razorpay')
const emailService = require('../emailService/mailsender')
require('dotenv').config()

exports.capturePayment = async(req, res) =>{
    console.log("capture payment api hitted")
    console.log('Request body', req.body)
    console.log('Request user', req.user)
    try{
        const {product_id, quantity} = req.body
        const userId = req.user.id
        console.log("Product ID:", product_id);
        console.log("Quantity:", quantity);
        console.log("User ID:", userId);
        if(!product_id){
            return res.status(400).json({
                success: false,
                message: "Product id is required"
            })
        }

        const product = await Product.findById(product_id).populate('createdBy', 'email name').exec()
        if(!product){
            return res.status(404).json({
                success: false, 
                message: "product not found"
            })
        }
        const qty = quantity || 1;  // Default 1
        const amount = product.price*qty;
        const currency = "INR"
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            notes: {
                userId,
                product_id,
                quantity: qty,
                sellerEmail: product.createdBy?.email,
                sellerName: product.createdBy?.name,
                productName: product.productName,
                productDescription: product.description,
                productPrice: product.price
            }
        }

        const paymentResponse = await instance.orders.create(options)
        return res.status(200).json({
            success: true,
            productName: product.productName,
            productDescription: product.description,
            amount: paymentResponse.amount,
            currency: paymentResponse.currency,
            orderId: paymentResponse.id,
            quantity: qty

        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Initiate payment
exports.verifySignature = async(req, res) =>{
    const webhook = process.env.RAZORPAY_WEBHOOK_SECRET
    const signature = req.headers['x-razorpay-signature']
    const shasum = crypto.createHmac('sha256', webhook)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    if(digest === signature){
        console.log("✅ Webhook verified!");
        const {productName, productDescription, productPrice, userId, product_id, sellerEmail, sellerName, quantity,} = req.body.payload.payment.entity.notes;
        let user;
        let order;  
        try{
            user = await User.findById(userId)
            order = await Order.create({
                itemName: productName,
                itemDescription: productDescription,
                totalAmount: productPrice,
                 quantity: quantity,
                address: {
                    street: user.address?.street || "NA",
                    pin: user.address?.pin || "NA"
                },
                orderedBy: userId,
                itemId: product_id
            })
            console.log("Order created:", order)
        }catch(err){
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "signatue could not verify"
            })
        }

        const sellerDetails = {
            sellerEmail,
            sellerName
        }

        await emailService.orderConfirmationEmailService(user, order)
        await emailService.sellerOrderConfirmationEmailService(user, sellerDetails, order)

        return res.status(200).json({
            success: true,
            message: "Payment verified and order created"
        })
    }else{
        
        return res.status(400).json({
            success: false,
            message: "invalid response"
        })
    }
}




// ✅ ADD THIS FUNCTION - Get all orders for logged in user
exports.getMyOrders = async (req, res) => {
    console.log("Get my orders API hitted");
    
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);

        // Find all orders for this user
        const orders = await Order.find({ orderedBy: userId })
            .sort({ createdAt: -1 }); // Latest first

        console.log(`Found ${orders.length} orders for user`);

        return res.status(200).json({
            success: true,
            data: orders
        });

    } catch (err) {
        console.log("Error in getMyOrders:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};