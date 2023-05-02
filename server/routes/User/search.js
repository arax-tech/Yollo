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
        const posts = await Post.find({ numbersOfLikes: { $gt: 0 }, status: "Active" }).populate("user", "first_name last_name username image").limit(12);
        const users = await User.find({ role: "User" }).select('-password -tokens -resetPasswordExpire -notification_settings -role -otp -following -followers -resetPasswordToken').populate('following.user', "image username last_name first_name ");
        // const badges = await Tag.find();

        const badges = await Tag.aggregate(
            [
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: "_id",
                        foreignField: "badges.badge",
                        as: 'badges'
                    }
                },
                {
                    $project:
                    {
                        _id: 1,
                        name: 1,
                        used: { $size: "$badges" }
                    }
                }
            ],
            function (err, result) {
                if (err) throw err;
                // console.log(result);
            });
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
