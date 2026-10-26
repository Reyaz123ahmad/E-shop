
const nodemailer = require('nodemailer');
const EmailTemplate = require('../emailTemplate/template');

require('dotenv').config();

// Transporter Configuration (Working for Render + Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS 
    },
    
});

// Helper function for sending emails
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"E-Shop" <${process.env.MAIL_FROM}>`,
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Email delivery failed to ${to}:`, error.message);
        throw error;
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
};