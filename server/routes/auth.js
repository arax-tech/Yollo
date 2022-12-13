const express = require("express")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const sendEmail = require("../include/sendEmail");



const router = express.Router()

// Middleware
const auth = require("../middleware/auth")

// Models 
const User = require("../models/User");



router.post('/login', async (request, response) => {

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {

        const { phone, email, type } = request.body;

        // Phone Registration
        if (type == "phone") {
            const user = await User.findOne({ phone: phone });

            if (user) {
                // Update Existing OTP
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp });

                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    message: "OTP Send Successfully...",
                });
            } else {
                // Save new User Phone
                await User.create({ phone: request.body.phone, otp: otp });

                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    message: "OTP Send Successfully...",
                });
            }
        } else {

            const message = `Your account verification OTP  is 👇 \n\n${otp}\n\n\nIf you have not requested this email then, please ignore this email... \n\n\nRegard Yello`;
            await sendEmail({
                email: email,
                subject: "Yello - OTP Verification",
                message
            });


            // Email Registration
            const user = await User.findOne({ email: email });

            if (user) {
                // Update Existing OTP
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp });

                response.status(200).json({
                    status: 200,
                    email: email,
                    phone: null,
                    type: type,
                    message: "OTP Send Successfully...",
                });
            } else {
                // Save new User Email
                await User.create({ email: request.body.email, otp: otp });

                response.status(200).json({
                    status: 200,
                    email: email,
                    phone: null,
                    type: type,
                    message: "OTP Send Successfully...",
                });
            }
        }



    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        })
    }
})

router.post('/verify', async (request, response) => {

    try {

        const { otp, email, phone, type } = request.body;
        const loginUser = await User.findOne({ otp: otp });


        if (loginUser) {

            const token = await loginUser.generateAuthToken();

            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            const authuser = await User.findById(loginUser._id).select('-createAt -password -tokens -resetPasswordExpire -resetPasswordToken');

            response.status(200).json({
                status: 202,
                message: "Login Successfully...",
                user: authuser,
                token: token
            })
        }
        else {
            response.status(401).json({
                status: 401,
                email: email,
                phone: phone,
                type: type,
                message: "Invalid OTP..."
            })
        }

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        })
    }
})

router.get("/logout", auth, async (request, response) => {
    try {
        // Logout form current device
        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });

        // Logout from all devices
        // request.user.tokens = [];


        response.clearCookie("token");
        // console.log("Logout Successfuly");
        const user = await request.user.save();
        response.status(200).json({
            status: 203,
            message: "Logout Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
})



module.exports = router;