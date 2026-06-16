const jwt = require('jsonwebtoken')

require('dotenv').config();

exports.auth = async( req, res, next ) =>{
    try{
        const token = req.body?.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if( !token ){
            return res.status( 400 ).json({
                success: false,
                message: "Token missing"
            })
        }

        try{
            const decode = await jwt.verify( token, process.env.JWT_SECRET );
            console.log(decode)
            req.user = decode;
        }catch(err){
            console.log('Invalid token error', err)
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            })
        }
        next()

    }catch( err ){
        console.log(err)
        return res.status( 500 ).json({
            success: false,
            message: "server error"
        })
    }
}

// Admin 
exports.isAdmin = async( req, res, next ) =>{
    try{
        if( req.user.role !== "Admin" ){
            return res.status(400).json({
                success: false,
                message: "This route is only for Admin"
            })
        }

        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Customer
exports.isCustomer = async( req, res, next ) =>{
    try{
        if( req.user.role !== "Customer" ){
            return res.status(400).json({
                success: false,
                message: "This Route only for customer"
            })
        }

        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
