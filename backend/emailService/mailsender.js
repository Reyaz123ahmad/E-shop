const EmailTemplate = require('../emailTemplate/template');

require('dotenv').config();
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY, 
            },
            body: JSON.stringify({
                sender: {
                    name: "E-Shop",
                    email: process.env.MAIL_FROM, 
                },
                to: [{ email: to }],
                subject: subject,
                htmlContent: htmlContent,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`Brevo API error: ${JSON.stringify(result)}`);
        }

        return { success: true, messageId: result.messageId };
        
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