const User = require('../model/User')
const OTP = require('../model/OTP')
const emailService = require('../emailService/mailsender')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { create } = require('node:domain')
const crypto = require('crypto')
const JWT_SECRET = require('dotenv')
const FRONTEND_URL = require('dotenv')
JWT_SECRET.config()
FRONTEND_URL.config()



// Simpler OTP generation without while loop
exports.OTP = async(req, res) => {
    try {
        console.log("Otp controller hit");
        const { email } = req.body;
        
        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Check if user exists
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists, please try with another email"
            });
        }

        // Generate OTP (simpler approach)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        console.log(`Generated OTP for ${email}: ${otp}`);

        // Delete any existing OTP for this email (optional)
        await OTP.deleteMany({ email: email });

        // Save OTP to database
        const otpPayload = { email, otp };
        const newOtp = await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            
        });
        
    } catch(err) {
        console.error("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

// Signup
exports.signup = async(req, res) =>{
    try{
        console.log("Signup called with body:", req.body);
        const { name, email, password, confirmPassword, role, otp, isDeleted } = req.body;
        

        if( !name || !email || !password || !confirmPassword || !role || !otp){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        // ✅ Step 1: Verify OTP
        const otpRecord = await OTP.findOne({ email, otp });
        
        if(!otpRecord){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }
        
        // ✅ Step 2: Check OTP expiry - SAHI TARIKA
        const otpCreatedTime = new Date(otpRecord.createdAt).getTime();
        const currentTime = Date.now();
        const expiryTime = 5 * 60 * 1000; // 5 minutes
        
        if(currentTime - otpCreatedTime > expiryTime){
            console.log("❌ OTP expired for:", email);
            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new one."
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(300).json({
                success: false,
                message: "User already exist"
            })
        }

        if( password !== confirmPassword ){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password should be same"
            })
        }

        const hashPassword = await bcrypt.hash( password, 10 )

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            isDeleted
        })

       
        await emailService.welcomeEmailService(newUser);
    
        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Login
exports.login = async(req, res) =>{
    try{
        const { email, password } = req.body;
        const jwt_secret = process.env.JWT_SECRET
        if( !email || !password ){
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            })
        }

        const user = await User.findOne({email, isDeleted: false});
        console.log("user", user)
        if( !user ){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        if(await bcrypt.compare( password, user.password )){
            const payload = {
                email: user.email,
                role: user.role,
                id: user._id
            }

            if( !JWT_SECRET ){
                return res.status(300).json({
                    success: false,
                    message: "Please Provide JWT_SECRET"
                })
            }
            
            const token = await jwt.sign( payload, jwt_secret, {expiresIn: "1h"})

            user.token = token;
            const userData = {
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    pincode: user.pincode,
                    imageUrl: user.imageUrl,
                    role: user.role,
                    id: user._id
            }

            const options = {
                expires: new Date( Date.now() + 1 * 60 * 60 *1000 ),
                httpOnly: true
            }

            return res.cookie( 'token', token, options ).json({
                success: true,
                data: userData,
                token: token,
                message: "User logged in successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// change password
exports.changePassword = async( req, res ) =>{
    try{
        const { password, newPassword, confirmNewPassword } = req.body;
        console.log("Change password called with body:", req.body);
        const userId = req.user.id;
        if( !password || !newPassword || !confirmNewPassword ){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById( userId )
        if( !user ){
            return res.status( 400 ).json({
                success: false,
                message: "user not found"
            })
        }

        if(await bcrypt.compare( password, user.password )){

            const isSame = await bcrypt.compare( newPassword, user.password)
            if(isSame){
                return res.status(400).json({
                    success: false,
                    message: "Old And New password should not be same"
                })
            }
            if( newPassword !== confirmNewPassword ){
                return res.status( 300 ).json({
                    success: false,
                    message: "new password and confirm new password should be same"
                })
            }

            const hashPassword = await bcrypt.hash( newPassword, 10 )
            user.password = hashPassword;
            await user.save()

            await emailService.changePasswordEmailService(user)
            return res.status(200).json({
                success: true,
                message: "Password changed successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Old Password Incorrect"
            })
        }

    }catch(err){
        console.log(err)
        return res.status( 500 ).json({
            success: false,
            message: "server error"
        })
    }
}

// Forgot password 
exports.forgotPassword = async( req, res ) =>{
    try{
        
        const { email } = req.body;
        if( !email ){
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

        const user = await User.findOne({email, isDeleted: false});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        user.resetPasswordToken = resetPasswordToken,
        user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/user/reset-password/${resetToken}`
        try{
            await emailService.forgotPasswordEmailService(user, resetUrl)

            return res.status(200).json({
                success: true,
                message: "Reset password url sent to your registerd email"
            })
        }catch(err){
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "error in email sending"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Reset Password
exports.resetPassword = async( req, res ) =>{
    try{
        const { token } = req.params;
        const { newPassword, confirmNewPassword } = req.body;

        if(!newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password are required"
            })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password should be same"
            })
        }

        const hashPassword = await bcrypt.hash( newPassword, 10 )

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordTokenExpires: {$gt: Date.now()}
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Invalid or Expired Token"
            })
        }

        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;

        await user.save()

        await emailService.changePasswordEmailService(user)

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    }catch( err ){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}