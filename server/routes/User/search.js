const express = require("express")
const router = express.Router()

// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Post = require("../../models/Post")
const User = require("../../models/User")
const Tag = require("../../models/Badge")


// All Posts
router.get("/", auth, user, async (request, response) => {
    try {
        const posts = await Post.find({ status: "Active" }).sort({ createAt: -1 }).populate("user", "first_name last_name username image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        const users = await User.find().select('-password -tokens -resetPasswordExpire -notification_settings -role -otp -following -followers -resetPasswordToken').populate('following.user', "image username last_name first_name ");
        const badges = await Tag.find();
        response.status(200).json({
            status: 200,
            posts: posts,
            users: users,
            badges: badges,
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

module.exports = router;
