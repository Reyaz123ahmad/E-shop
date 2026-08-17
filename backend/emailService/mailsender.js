// const nodemailer = require('nodemailer')
// const EmailTemplate = require('../emailTemplate/template')

// require('dotenv').config()
// const transporter = nodemailer.createTransport({
//     // host: process.env.MAIL_HOST,
//     service: 'gmail',
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     },
//      // ✅ YEH ADD KARO - IPv4 force karo
//     family: 4,  // 4 = IPv4, 6 = IPv6
//     tls: {
//         rejectUnauthorized: false
//     }
// })

// exports.otpEmailService = async(email, otp) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: email,
//             subject: "OTP for registration completeion",
//             html: EmailTemplate.otpEmailTemplate(otp)
//         }

//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in Otp Email Sending", err)
//     }
// }

// exports.welcomeEmailService = async(newUser) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: newUser.email,
//             subject: "Welcome Email",
//             html: EmailTemplate.welcomeEmailTemplate(newUser)
//         }

//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in Welcome Email Sending", err)
//     }
// }

// exports.orderConfirmationEmailService = async(user, order) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: user.email,
//             subject: "Order confirmation email",
//             html: EmailTemplate.orderConfirmationEmailTemplate(user, order)
//         }

//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in order conformation email sending", err)
//     }
// }

// exports.sellerOrderConfirmationEmailService = async(user, sellerDetails, order) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: sellerDetails.sellerEmail,
//             subject: "Seller order notification",
//             html: EmailTemplate.sellerOrderEmailTemplate(user, sellerDetails, order)
//         }
//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in seller order confirmation email sending", err)
//     }
// }

// exports.forgotPasswordEmailService = async(user, resetUrl) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: user.email,
//             subject: "Forgot password reset link email",
//             html: EmailTemplate.forgotPasswordEmailTemplate(user, resetUrl)
//         }
//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in forgot password email sending", err)
//     }
// }

// exports.changePasswordEmailService = async(user) =>{
//     try{
//         const emailOptions = {
//             from: process.env.MAIL_USER,
//             to: user.email,
//             subject: "Change password confirmation email",
//             html: EmailTemplate.changePasswordEmailTemplate(user)
//         }
//         const result = await transporter.sendMail(emailOptions)
//         return result
//     }catch(err){
//         console.log("Error in change password confirmation email sending", err)
//     }
// }















const nodemailer = require('nodemailer');
const EmailTemplate = require('../emailTemplate/template');

require('dotenv').config();

// Transporter Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Port 465 ke liye SSL mandatory hai
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS // Gmail App Password (16-digit)
    },
    family: 4
});

// Helper function to handle sending email safely
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"E-Shop" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Email delivery failed to ${to}:`, error.message);
        throw error; // Controller me error handle karne ke liye
    }
};

// 1. OTP Email
exports.otpEmailService = async (email, otp) => {
    return await sendEmail(
        email,
        "OTP for Registration Completion",
        EmailTemplate.otpEmailTemplate(otp)
    );
};

// 2. Welcome Email
exports.welcomeEmailService = async (newUser) => {
    return await sendEmail(
        newUser.email,
        "Welcome to E-Shop!",
        EmailTemplate.welcomeEmailTemplate(newUser)
    );
};

// 3. Order Confirmation Email
exports.orderConfirmationEmailService = async (user, order) => {
    return await sendEmail(
        user.email,
        "Order Confirmation - E-Shop",
        EmailTemplate.orderConfirmationEmailTemplate(user, order)
    );
};

// 4. Seller Order Notification Email
exports.sellerOrderConfirmationEmailService = async (user, sellerDetails, order) => {
    return await sendEmail(
        sellerDetails.sellerEmail,
        "New Order Received - E-Shop",
        EmailTemplate.sellerOrderEmailTemplate(user, sellerDetails, order)
    );
};

// 5. Forgot Password Email
exports.forgotPasswordEmailService = async (user, resetUrl) => {
    return await sendEmail(
        user.email,
        "Password Reset Request",
        EmailTemplate.forgotPasswordEmailTemplate(user, resetUrl)
    );
};

// 6. Change Password Confirmation Email
exports.changePasswordEmailService = async (user) => {
    return await sendEmail(
        user.email,
        "Password Changed Successfully",
        EmailTemplate.changePasswordEmailTemplate(user)
    );
}





