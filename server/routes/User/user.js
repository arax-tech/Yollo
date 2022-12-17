const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Tag = require("../../models/Tag")



router.get("/profile", auth, user, async (request, response) => {
    try {
        const _id = request.user.id;
        const tags = await Tag.find({ user_id: _id });
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user_id', "image username last_name first_name ").populate('followers.user_id', "image username last_name first_name ");;
        response.status(200).json({
            status: 200,
            user: user,
            tags: tags
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
        // console.log(request.body);
        const _id = request.user.id;

        const { first_name, last_name, username, email, phone, gender, birthday, country, city, bio, new_user, image } = request.body;

        if (image) {
            const user = await User.findByIdAndUpdate(_id);
            if (user?.image.public_id) {
                const imageUrl = user.image.public_id;
                await cloudinary.v2.uploader.destroy(imageUrl);
            }

            const myCloud = await cloudinary.v2.uploader.upload(image, { folder: "yello/avatars" });

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
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.put("/follow", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;

        await User.findByIdAndUpdate({ _id: request.body.follow_user_id }, {
            $push: { followers: { user_id: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $push: { following: { user_id: request.body.follow_user_id } }
        }, { new: true });

        response.status(200).json({
            status: 220,
            message: "Follow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});



router.put("/unfollow", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        console.log(request.body.unfollow_user_id)
        await User.findByIdAndUpdate({ _id: request.body.unfollow_user_id }, {
            $pull: { followers: { user_id: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $pull: { following: { user_id: request.body.unfollow_user_id } }
        }, { new: true });

        response.status(200).json({
            status: 230,
            message: "UnFollow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.put("/unfollowFollowers", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        console.log(user_id)
        console.log(request.body.unfollow_user_id)
        await User.findByIdAndUpdate({ _id: user_id }, {
            $pull: { followers: { user_id: request.body.unfollow_user_id } }
        });

        await User.findByIdAndUpdate({ _id: request.body.unfollow_user_id }, {
            $pull: { following: { user_id: user_id } }
        }, { new: true });

        response.status(200).json({
            status: 230,
            message: "UnFollow Successfully..."
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});

router.get("/suggession", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        const users = await User.find().select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user_id', "image username last_name first_name ").populate('followers.user_id', "image username last_name first_name ");

        response.status(200).json({
            status: 200,
            users: users
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});




module.exports = router;
