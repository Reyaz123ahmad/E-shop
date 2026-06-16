const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("DB Connected Successfully")
    }catch(err){
        console.log("DB Connection Error", err)
        process.exit(1)
    }
}


































