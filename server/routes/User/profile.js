const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")



router.get("/profile", auth, user, async (request, response) => {
    try {
        const _id = request.user.id;
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');
        response.status(200).json({
            status: 200,
            user: user
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.put("/account/update", auth, user, async (request, response) => {

    try {
        const _id = request.user.id;
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "Account Updated Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


router.put("/account/update/notification/settings", auth, user, async (request, response) => {

    try {
        console.log(request.body);
        const _id = request.user.id;
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "Settings Update Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});



router.put("/profile", auth, user, async (request, response) => {

    try {
        console.log(request.body);
        const _id = request.user.id;

        const { first_name, last_name, username, email, phone, gender, birthday, country, city, bio, new_user } = request.body;

        if (request.body.avatar) {
            // const user = await User.findByIdAndUpdate(_id);
            // const imageUrl = user.image.public_id;
            // await cloudinary.v2.uploader.destroy(imageUrl);

            const myCloud = await cloudinary.v2.uploader.upload(request.body.avatar, {
                folder: "yello/avatars"
            });

            await User.findByIdAndUpdate(_id, {
                first_name, last_name, username, email, phone, gender, birthday, country, city, bio, new_user,
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            });
        } else {
            await User.findByIdAndUpdate(_id, request.body, { new: true });
        }


        response.status(200).json({
            status: 200,
            message: "Profile Updated Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


module.exports = router;
