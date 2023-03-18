const express = require("express")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const sendEmail = require("../include/sendEmail");



const router = express.Router()

// Middleware
const auth = require("../middleware/auth")

// Models 
const Diamond = require("../models/Diamond");
const User = require("../models/User");



router.post('/login', async (request, response) => {

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {

        const { phone, email, type, code } = request.body;

        // Phone Registration
        if (type == "phone") {
            const user = await User.findOne({ phone: phone });

            if (user) {
                // Update Existing OTP
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp, status: 'Active' });

                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    code: code,
                    message: "OTP Send Successfully...",
                });
            } else {
                // Save new User Phone

                await User.create({ phone: request.body.phone, otp: otp, status: 'Active' });
                const user = await User.findOne({ email: email });
                await Diamond.create({
                    user: user._id,
                    diamonds: 1000
                });




                response.status(200).json({
                    status: 200,
                    phone: phone,
                    email: null,
                    type: type,
                    code: code,
                    message: "OTP Send Successfully...",
                });
            }
        } else {

            const message = `Your account verification OTP  is 👇 \n\n${otp}\n\n\nIf you have not requested this email then, please ignore this email... \n\n\nRegard Yello`;
            // await sendEmail({
            //     email: email,
            //     subject: "Yello - OTP Verification",
            //     message
            // });


            // Email Registration
            const user = await User.findOne({ email: email });


            if (user) {
                // Update Existing OTP
                const _id = user.id;
                await User.findByIdAndUpdate(_id, { otp: otp, status: 'Active' });

                response.status(200).json({
                    status: 200,
                    email: email,
                    phone: null,
                    type: type,
                    code: code,
                    message: "OTP Send Successfully...",
                });
            } else {
                // Save new User Email
                await User.create({ email: request.body.email, otp: otp, status: 'Active' });

                const user = await User.findOne({ email: email });
                await Diamond.create({
                    user: user._id,
                    diamonds: 1000
                });

                response.status(200).json({
                    status: 200,
                    email: email,
                    phone: null,
                    type: type,
                    code: code,
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

        const { otp, email, phone, type, code } = request.body;
        const loginUser = await User.findOne({ otp: otp });


        if (loginUser) {

            const token = await loginUser.generateAuthToken();

            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            const authuser = await User.findById(loginUser?._id).select('-createAt -password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ");

            // Add Ref Diamonds
            if (code && code !== null) {
                const diamond = await Diamond.findOne({ user: code });

                await Diamond.findByIdAndUpdate(diamond._id, {
                    $set: {
                        diamonds: diamond.diamonds + 1000
                    }
                });


            }
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




router.post("/disable/account", auth, async (request, response) => {
    try {
        console.log(request.user)
        const _id = request.user.id;

        await User.findByIdAndUpdate(_id, { status: "InActive" });

        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });

        response.clearCookie("token");
        await request.user.save();
        response.status(200).json({
            status: 204,
            message: "Account Disable Successfully..."
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


router.delete("/delete/account", auth, async (request, response) => {
    try {
        const _id = request.user.id;
        // request.user.tokens = request.user.tokens.filter((currentElement) => {
        //     return currentElement.token === request.token
        // });


        // response.clearCookie("token");
        // const user = await request.user.save();
        await User.findByIdAndDelete(_id);

        response.status(200).json({
            status: 205,
            message: "Account Delete Successfully..."
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