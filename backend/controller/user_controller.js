
const User = require('../model/User');
const { uploadFileToCloudinary } = require('../utils/uploadToCloudinary');

require('dotenv').config();

// ✅ GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};

// ✅ UPDATE PROFILE - FIXED
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, address, city, pincode } = req.body;
        const file = req.files?.imageFile; // ✅ File check

        console.log("📥 Update Profile Request:");
        console.log("Body:", req.body);
        console.log("File:", file ? "File received ✅" : "No file ❌");

        // ✅ PEHLE USER FIND KARO
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let updated = false;

        // ✅ UPDATE TEXT FIELDS
        if (name !== undefined && name !== '') {
            user.name = name;
            updated = true;
        }
        if (phone !== undefined && phone !== '') {
            user.phone = phone;
            updated = true;
        }
        if (address !== undefined && address !== '') {
            user.address = address;
            updated = true;
        }
        if (city !== undefined && city !== '') {
            user.city = city;
            updated = true;
        }
        if (pincode !== undefined && pincode !== '') {
            user.pincode = pincode;
            updated = true;
        }

        // ✅ UPDATE IMAGE - SIRF TAB JAB FILE AAYE
        if (file) {
            console.log("📤 Uploading image to Cloudinary...");
            try {
                const uploadResponse = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
                console.log("✅ Cloudinary upload success:", uploadResponse.secure_url);
                user.imageUrl = uploadResponse.secure_url;
                updated = true;
            } catch (uploadError) {
                console.error("❌ Cloudinary upload failed:", uploadError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image to Cloudinary",
                    error: uploadError.message
                });
            }
        }

        if (!updated) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        await user.save();
        const updatedUser = await User.findById(userId).select('-password');
        
        console.log("✅ Updated user:", {
            id: user._id,
            name: user.name,
            phone: user.phone,
            address: user.address,
            city: user.city,
            pincode: user.pincode,
            imageUrl: user.imageUrl
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (err) {
        console.error("❌ Error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: err.message
        });
    }
};

// ✅ DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete account"
        });
    }
};