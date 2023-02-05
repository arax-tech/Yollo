const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Tag = require("../../models/Badge")
const Diamond = require("../../models/Diamond")
const Notification = require("../../models/Notification")
const Reaction = require("../../models/Reaction")
const Post = require("../../models/Post")





router.get("/profile", auth, user, async (request, response) => {
    try {
        const _id = request.user.id;
        const tags = await Tag.find({ user: _id });
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ");;

        const activePosts = await Post.find({ status: "Active", user: _id }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes", "first_name last_name image");

        const profilePostYouLikes = await Post.find({ likes: { $in: request.user.id } }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");

        const profilePostLikes = await Post.find({ user: _id, numbersOfLikes: { $gt: 0 } }).sort({ numbersOfLikes: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");
        ;
        const diamonds = await Diamond.find({ user: _id }).sort({ createAt: -1 }).populate("transactions.user", "first_name last_name image");

        const notifications = await Notification.find({ user_id: _id, status: "Show" }).populate("user", "first_name last_name image").populate("post", "first_name last_name image");
        const reactions = await Reaction.find({ user: _id }).populate("reaction_user", "first_name last_name image");

        response.status(200).json({
            status: 200,
            user: user,
            tags: tags,
            diamonds: diamonds && diamonds[0],
            notifications: notifications,
            reactions: reactions,
            activePosts: activePosts,
            profilePostLikes: profilePostLikes,
            profilePostYouLikes: profilePostYouLikes
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.get("/single/:id", auth, user, async (request, response) => {
    try {
        const _id = request.params.id;
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ");;

        const activePosts = await Post.find({ status: "Active", user: _id }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes", "first_name last_name image");
        const profilePostYouLikes = await Post.find({ likes: { $in: _id } }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");
        const profilePostLikes = await Post.find({ user: _id, numbersOfLikes: { $gt: 0 } }).sort({ numbersOfLikes: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.", "first_name last_name image").populate("likes", "first_name last_name image");
        const reactions = await Reaction.find({ user: _id }).populate("reaction_user", "first_name last_name image");

        response.status(200).json({
            status: 200,
            user: user,
            reactions: reactions,
            activePosts: activePosts,
            profilePostLikes: profilePostLikes,
            profilePostYouLikes: profilePostYouLikes
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
        // console.log(request.body);
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

        if (image == null) {
            const user = await User.findByIdAndUpdate(_id);
            request.body.image = user?.image;
            await User.findByIdAndUpdate(_id, request.body, { new: true });
        } else {
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
            $push: { followers: { user: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $push: { following: { user: request.body.follow_user_id } }
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
            $pull: { followers: { user: user_id } }
        }, { new: true });

        await User.findByIdAndUpdate({ _id: user_id }, {
            $pull: { following: { user: request.body.unfollow_user_id } }
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
            $pull: { followers: { user: request.body.unfollow_user_id } }
        });

        await User.findByIdAndUpdate({ _id: request.body.unfollow_user_id }, {
            $pull: { following: { user: user_id } }
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
        const users = await User.find().select('-password -tokens -resetPasswordExpire -resetPasswordToken').populate('following.user', "image username last_name first_name ").populate('followers.user', "image username last_name first_name ");

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








