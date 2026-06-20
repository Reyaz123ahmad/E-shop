const nodemailer = require('nodemailer')
const EmailTemplate = require('../emailTemplate/template')

require('dotenv').config()
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

exports.otpEmailService = async(email, otp) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "OTP for registration completeion",
            html: EmailTemplate.otpEmailTemplate(otp)
        }

        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in Otp Email Sending", err)
    }
}

exports.welcomeEmailService = async(newUser) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: newUser.email,
            subject: "Welcome Email",
            html: EmailTemplate.welcomeEmailTemplate(newUser)
        }

        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in Welcome Email Sending", err)
    }
}

exports.orderConfirmationEmailService = async(user, order) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Order confirmation email",
            html: EmailTemplate.orderConfirmationEmailTemplate(user, order)
        }

        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in order conformation email sending", err)
    }
}

exports.sellerOrderConfirmationEmailService = async(user, sellerDetails, order) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: sellerDetails.sellerEmail,
            subject: "Seller order notification",
            html: EmailTemplate.sellerOrderEmailTemplate(user, sellerDetails, order)
        }
        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in seller order confirmation email sending", err)
    }
}

exports.forgotPasswordEmailService = async(user, resetUrl) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Forgot password reset link email",
            html: EmailTemplate.forgotPasswordEmailTemplate(user, resetUrl)
        }
        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in forgot password email sending", err)
    }
}

exports.changePasswordEmailService = async(user) =>{
    try{
        const emailOptions = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Change password confirmation email",
            html: EmailTemplate.changePasswordEmailTemplate(user)
        }
        const result = await transporter.sendMail(emailOptions)
        return result
    }catch(err){
        console.log("Error in change password confirmation email sending", err)
    }
}





















