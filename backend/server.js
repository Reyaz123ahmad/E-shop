// const express = require('express')
// const app = express()
// const dotenv = require('dotenv')
// const database = require('./config/db')
// const userRoutes = require('./routes/user_routes')
// const productRoutes = require('./routes/product_routes')
// const paymentRoutes = require('./routes/payment_routes')
// const cloudinary=require('./config/cloudinary')
// const fileUpload=require('express-fileupload')
// const cors = require('cors')
// const path = require('path')
// const os = require('os')  // ✅ ADD THIS
// dotenv.config()
// const PORT = process.env.PORT

// database.connect()

// cloudinary.cloudinaryConnect();
// app.use(express.json())

// app.use(fileUpload({
//     useTempFiles:true,
//     //tempFileDir: '/temp/uploads'
//     tempFileDir: os.tmpdir(),
// }))

// app.use(cors({
//     origin: [
//         'http://localhost:5173',
//         'http://localhost:5174', 
//         'http://localhost:5175', 
//         'http://localhost:3000',
//         'http://localhost:5176',
//         'http://localhost:5177',
//         'https://e-shop-beta-eight.vercel.app'
//     ],  // ← Fix: use array
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }))

// app.use("/api/v1/user", userRoutes)
// app.use("/api/v1/product", productRoutes)
// app.use("/api/v1/payment", paymentRoutes)

// app.use('/', (req, res) =>{
//     console.log("server running")
// })

// app.listen(PORT, () =>{
//     console.log(`server running on ${PORT}`)
// })







const express = require('express')
const app = express()
const dotenv = require('dotenv')
const database = require('./config/db')
const userRoutes = require('./routes/user_routes')
const productRoutes = require('./routes/product_routes')
const paymentRoutes = require('./routes/payment_routes')
const cloudinary = require('./config/cloudinary')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const os = require('os')

dotenv.config()
const PORT = process.env.PORT || 5000

// Database & Cloudinary Connection
database.connect()
cloudinary.cloudinaryConnect()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
}))

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174', 
        'http://localhost:5175', 
        'http://localhost:3000',
        'http://localhost:5176',
        'http://localhost:5177',
        'https://e-shop-beta-eight.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

// API Routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/payment", paymentRoutes)

// Default Health Check Route (Fix: `app.get` use karein aur proper JSON response dein)
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running fine"
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})























