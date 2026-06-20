const Product = require('../model/Product')
const User = require('../model/User')
require('dotenv').config()



// Create Product with image upload
const { uploadFileToCloudinary } = require('../utils/uploadToCloudinary');

exports.createProduct = async( req, res ) =>{
    try{
        const { productName, description, price, isDeleted } = req.body;
        const userId = req.user.id;
        const file = req.files.imageFile;
        if(!productName || !description || !price){
            return res.status(400).json({
                success: false,
                message: "Please fill the missing field"
            })
        }

        
            
        // Use existing upload function
        const uploadResponse = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
        console.log(uploadResponse)
        
       

        const productPayload = {
            productName,
            description,
            price,
            image: uploadResponse.secure_url,
            createdBy: userId,
            isDeleted: isDeleted || false
        }

        const newProduct = await Product.create(productPayload)
        
        return res.status(201).json({
            success: true,
            data: newProduct,
            message: "Product created successfully"
        })
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Retrive Product
exports.getProduct = async(req, res) =>{
    try{
        const products = await Product.find({
            isDeleted: false
        }).populate('createdBy', 'name email role')
        console.log("Total products found:", products.length);
        if(!products){
            return res.status(404).json({
                success: false,
                message: "products not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: products,
            message: "Products Retrive Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Retrive product by id
exports.getProductById = async(req, res) =>{
    try{
        const {productId} = req.params;

        const product = await Product.findOne({
            _id: productId,
            isDeleted: false
        }).populate('createdBy', 'name email role')

        if(!product){
            return res.status(404).json({
                success: false,
                message: `Product Not found for product id: ${productId}`
            })
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product retrive successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Update Product
exports.updateProduct = async(req, res) =>{
    
    try{
        const { productName, description, price, } = req.body;
         const file = req.files.imageFile;
        const userId = req.user.id;
        const {productId} = req.params;
        const user = await User.findOne({
            _id: userId,
            isDeleted: false
        })

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid user"
            })
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
         // Use existing upload function
        const uploadResponse = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
        console.log(uploadResponse)
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, {
            productName,
            description,
            price,
            image: uploadResponse.secure_url,
            updatedBy: userId
        }, {new: true})

        return res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product Updated successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Delete Product
exports.deleteProduct = async(req, res) =>{
    try{
        const {productId} = req.params;

        const product = await Product.findOne({
            _id: productId,
            isDeleted: false
        })

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found Or Already Deleted"
            })
        }

        const deletedProduct = await Product.findByIdAndUpdate(
            { _id: productId },
            {
                isDeleted: true
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}