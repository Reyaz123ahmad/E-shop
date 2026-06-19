// const User = require('../model/User')
// const Product = require('../model/Product')
// const Order = require('../model/Order')
// const crypto = require('crypto')
// const { instance } = require('../config/razorpay')
// const emailService = require('../emailService/mailsender')
// require('dotenv').config()

// exports.capturePayment = async(req, res) =>{
//     console.log("capture payment api hitted")
//     console.log('Request body', req.body)
//     console.log('Request user', req.user)
//     try{
//         const {product_id, quantity} = req.body
//         const userId = req.user.id
//         console.log("Product ID:", product_id);
//         console.log("Quantity:", quantity);
//         console.log("User ID:", userId);
//         if(!product_id){
//             return res.status(400).json({
//                 success: false,
//                 message: "Product id is required"
//             })
//         }

//         const product = await Product.findById(product_id).populate('createdBy', 'email name').exec()
//         if(!product){
//             return res.status(404).json({
//                 success: false, 
//                 message: "product not found"
//             })
//         }
//         const qty = quantity || 1;  // Default 1
//         const amount = product.price*qty;
//         const currency = "INR"
//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
//             notes: {
//                 userId,
//                 product_id,
//                 quantity: qty,
//                 sellerEmail: product.createdBy?.email,
//                 sellerName: product.createdBy?.name,
//                 productName: product.productName,
//                 productDescription: product.description,
//                 productPrice: product.price
//             }
//         }

//         const paymentResponse = await instance.orders.create(options)
//         return res.status(200).json({
//             success: true,
//             productName: product.productName,
//             productDescription: product.description,
//             amount: paymentResponse.amount,
//             currency: paymentResponse.currency,
//             orderId: paymentResponse.id,
//             quantity: qty

//         })


//     }catch(err){
//         console.log(err)
//         return res.status(500).json({
//             success: false,
//             message: "server error"
//         })
//     }
// }

// // Initiate payment
// exports.verifySignature = async(req, res) =>{
//     const webhook = process.env.RAZORPAY_WEBHOOK_SECRET
//     const signature = req.headers['x-razorpay-signature']
//     const shasum = crypto.createHmac('sha256', webhook)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest('hex')
//     console.log('webhook signature', webhook || signature)
//     if(digest === signature || true){
//         console.log("✅ Webhook verified!");
//         const {productName, productDescription, productPrice, userId, product_id, sellerEmail, sellerName, quantity,} = req.body.payload.payment.entity.notes;
//         let user;
//         let order;  
//         try{
//             console.log("🔐 verifySignature called");
//         console.log("📦 Headers:", req.headers);
//         console.log("📦 Body:", req.body);
//             user = await User.findById(userId)
//             order = await Order.create({
//                 itemName: productName,
//                 itemDescription: productDescription,
//                 totalAmount: productPrice,
//                  quantity: quantity,
//                 address: {
//                     street: user.address?.street || "NA",
//                     pin: user.address?.pin || "NA"
//                 },
//                 orderedBy: userId,
//                 itemId: product_id
//             })
//             console.log("Order created:", order)
//         }catch(err){
//             console.log(err)
//             return res.status(400).json({
//                 success: false,
//                 message: "signatue could not verify"
//             })
//         }

//         const sellerDetails = {
//             sellerEmail,
//             sellerName
//         }

//         await emailService.orderConfirmationEmailService(user, order)
//         await emailService.sellerOrderConfirmationEmailService(user, sellerDetails, order)

//         return res.status(200).json({
//             success: true,
//             message: "Payment verified and order created"
//         })
//     }else{
        
//         return res.status(400).json({
//             success: false,
//             message: "invalid response"
//         })
//     }
// }




// // ✅ ADD THIS FUNCTION - Get all orders for logged in user
// exports.getMyOrders = async (req, res) => {
//     console.log("Get my orders API hitted");
    
//     try {
//         const userId = req.user.id;
//         console.log("User ID:", userId);

//         // Find all orders for this user
//         const orders = await Order.find({ orderedBy: userId })
//             .sort({ createdAt: -1 }); // Latest first

//         console.log(`Found ${orders.length} orders for user`);

//         return res.status(200).json({
//             success: true,
//             data: orders
//         });

//     } catch (err) {
//         console.log("Error in getMyOrders:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch orders"
//         });
//     }
// };















const User = require('../model/User')
const Product = require('../model/Product')
const Order = require('../model/Order')
const crypto = require('crypto')
const { instance } = require('../config/razorpay')
const emailService = require('../emailService/mailsender')
require('dotenv').config()

// ✅ 1. CAPTURE PAYMENT - Razorpay order create
exports.capturePayment = async (req, res) => {
    console.log("📦 capturePayment called")
    console.log("📦 Request body:", req.body)
    
    try {
        const { product_id, quantity } = req.body
        const userId = req.user.id

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }

        const product = await Product.findById(product_id).populate('createdBy', 'email name').exec()
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const qty = quantity || 1
        const amount = product.price * qty
        const currency = "INR"

        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            notes: {
                userId: userId,
                product_id: product_id,
                quantity: qty,
                sellerEmail: product.createdBy?.email || '',
                sellerName: product.createdBy?.name || '',
                productName: product.productName,
                productDescription: product.description,
                productPrice: product.price
            }
        }

        const paymentResponse = await instance.orders.create(options)
        console.log("✅ Razorpay order created:", paymentResponse.id)

        return res.status(200).json({
            success: true,
            productName: product.productName,
            productDescription: product.description,
            amount: paymentResponse.amount,
            currency: paymentResponse.currency,
            orderId: paymentResponse.id,
            quantity: qty
        })

    } catch (error) {
        console.error("❌ Capture payment error:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to initiate payment"
        })
    }
}

// ✅ 2. VERIFY PAYMENT - FRONTEND SE (Course style)
exports.verifyPayment = async (req, res) => {
    try {
        console.log("🔐 verifyPayment called")
        console.log("📦 Request body:", req.body)

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            product_id,
            quantity
        } = req.body

        const userId = req.user.id

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !product_id || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        // ✅ Verify signature - Course style
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

        console.log("🔐 Expected Signature:", expectedSignature)
        console.log("🔐 Received Signature:", razorpay_signature)

        if (expectedSignature !== razorpay_signature) {
            console.log("❌ Invalid signature")
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }

        console.log("✅ Signature verified")

        // ✅ CREATE ORDER (Course style - enrollStudents ki jagah)
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Check if order already exists
        const existingOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id })
        if (existingOrder) {
            console.log("⚠️ Order already exists:", existingOrder._id)
            return res.status(200).json({
                success: true,
                message: "Order already exists",
                order: existingOrder
            })
        }

        // Get product details from Razorpay order notes
        const razorpayOrder = await instance.orders.fetch(razorpay_order_id)
        const notes = razorpayOrder.notes || {}

        const newOrder = await Order.create({
            itemName: notes.productName || "Product",
            itemDescription: notes.productDescription || "",
            totalAmount: notes.productPrice * (notes.quantity || 1),
            quantity: notes.quantity || 1,
            address: {
                street: user.address?.street || "NA",
                pin: user.address?.pin || "NA"
            },
            orderedBy: userId,
            itemId: notes.product_id || product_id,
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            paymentStatus: "Paid",
            orderStatus: "Processing"
        })

        console.log("✅ Order created:", newOrder._id)

        // ✅ Send email
        // try {
        //     await emailService.orderConfirmationEmailService(user, newOrder)
        //     console.log("✅ Email sent")
        // } catch (emailError) {
        //     console.log("⚠️ Email error:", emailError.message)
        // }

        return res.status(200).json({
            success: true,
            message: "Payment verified and order created",
            order: newOrder
        })

    } catch (error) {
        console.error("❌ Verify payment error:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to verify payment"
        })
    }
}

// ✅ 3. WEBHOOK - RAZORPAY SE (Extra safety)
exports.verifySignature = async (req, res) => {
    try {
        console.log("📨 Webhook called")
        console.log("📦 Headers:", req.headers)
        console.log("📦 Body:", req.body)

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
        const signature = req.headers['x-razorpay-signature']

        // ✅ Verify webhook signature
        const shasum = crypto.createHmac('sha256', webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')

        if (signature !== digest) {
            console.log("❌ Invalid webhook signature")
            return res.status(400).json({
                success: false,
                message: "Invalid webhook signature"
            })
        }

        console.log("✅ Webhook signature verified")

        const payment = req.body.payload.payment.entity
        const notes = payment.notes || {}
        const razorpay_order_id = payment.order_id
        const razorpay_payment_id = payment.id

        const userId = notes.userId
        const productId = notes.product_id
        const qty = notes.quantity || 1
        const totalAmount = notes.productPrice * qty

        // ✅ Check user
        const user = await User.findById(userId)
        if (!user) {
            console.log("❌ User not found:", userId)
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // ✅ Check if order already exists
        const existingOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id })
        if (existingOrder) {
            console.log("⚠️ Order already exists:", existingOrder._id)
            return res.status(200).json({
                success: true,
                message: "Order already exists",
                order: existingOrder
            })
        }

        // ✅ Create order
        const newOrder = await Order.create({
            itemName: notes.productName || "Product",
            itemDescription: notes.productDescription || "",
            totalAmount: totalAmount,
            quantity: qty,
            address: {
                street: user.address?.street || "NA",
                pin: user.address?.pin || "NA"
            },
            orderedBy: userId,
            itemId: productId,
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            paymentStatus: "Paid",
            orderStatus: "Processing"
        })

        console.log("✅ Order created via webhook:", newOrder._id)

        // ✅ Send emails
        try {
            const sellerDetails = {
                sellerEmail: notes.sellerEmail,
                sellerName: notes.sellerName
            }
            await emailService.orderConfirmationEmailService(user, newOrder)
            await emailService.sellerOrderConfirmationEmailService(user, sellerDetails, newOrder)
            console.log("✅ Emails sent")
        } catch (emailError) {
            console.log("⚠️ Email error:", emailError.message)
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified and order created"
        })

    } catch (error) {
        console.error("❌ Webhook error:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to process webhook"
        })
    }
}

// ✅ 4. GET MY ORDERS
exports.getMyOrders = async (req, res) => {
    console.log("📦 getMyOrders called")
    
    try {
        const userId = req.user.id

        const orders = await Order.find({ orderedBy: userId })
            .sort({ createdAt: -1 })

        console.log(`✅ Found ${orders.length} orders`)

        return res.status(200).json({
            success: true,
            data: orders
        })

    } catch (error) {
        console.error("❌ Get orders error:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        })
    }
}

