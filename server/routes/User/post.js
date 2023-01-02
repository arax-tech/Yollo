const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const Post = require("../../models/Post")
const Notification = require("../../models/Notification")
const Reaction = require("../../models/Reaction")


// All Posts
router.get("/", auth, user, async (request, response) => {
    try {
        const posts = await Post.find({ status: "Active" }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            posts: posts
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// My Following Posts

router.get("/my-following-posts", auth, user, async (request, response) => {
    try {
        console.log(request.user.following[0].user.toString())
        // { user: { $in: request.user.following[0].user.toString() } }
        const posts = await Post.find({ user: { $in: [request.user.following.map((user) => (user.user.toString()))] } }).sort({ createAt: -1 }).populate("user", "first_name last_name image").populate("comments.user", "first_name last_name image").populate("likes.user", "first_name last_name image");
        response.status(200).json({
            status: 200,
            posts: posts
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.post("/store", auth, user, async (request, response) => {
    try {
        request.body.user = request.user.id;


        const { caption, image, who_can_see, allow_comments, allow_reactions, allow_high_quality, diamonds } = request.body;



        const myCloud = await cloudinary.v2.uploader.upload(image, { folder: "yello/posts" });

        await Post.create({
            user: request.user.id, caption, who_can_see, allow_comments, allow_reactions, allow_high_quality, diamonds,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });


        response.status(201).json({
            status: 201,
            message: "Post Create Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})






router.post("/remove/diamonds", auth, user, async (request, response) => {
    try {

        const posts = await Post.find();

        posts?.map(async (post) => (
            await Post.findByIdAndUpdate(post._id, {
                $set: {
                    diamonds: post.diamonds > 0 ? post.diamonds - 1 : 0,
                }
            }, {
                new: true,
                useFindAndModify: false
            })
        ));

        const NewPosts = await Post.find();

        NewPosts?.map(async (post) => (
            await Post.findByIdAndUpdate(post._id, {
                $set: {
                    status: post.diamonds > 0 ? "Active" : "InActive"
                }
            }, {
                new: true,
                useFindAndModify: false
            })
        ));



        response.status(200).json({
            status: 200,
            message: "Diamonds Remove Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.delete("/delete/:id", auth, user, async (request, response) => {
    try {
        const posts = await Post.findByIdAndDelete({ _id: request.params.id });
        response.status(200).json({
            status: 200,
            message: "Post Delete Successfuly..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})





// Comments

router.put("/comment/store/:post_id", auth, user, async (request, response) => {
    try {

        const { comment } = request.body;

        const post = await Post.findById(request.params.post_id);

        post.comments.push({
            user: request.user.id,
            comment,
            createAt: new Date(Date.now()),
        });


        await post.save();

        // Notification
        await Notification.create({
            user_id: post?.user.toString(),
            user: request.user.id,
            description: "comment on your photo",
            type: "Comment"
        });

        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "comment on your photo",
        });

        const newPost = await Post.findById(request.params.post_id);

        response.status(201).json({
            status: 201,
            updatedComments: newPost.comments,
            message: "Comment Create Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})






router.delete("/comment/delete/:post_id/:comment_id", auth, async (request, response) => {
    try {

        const { post_id, comment_id } = request.params;
        const post = await Post.findById({ _id: post_id });

        post.comments = post.comments.filter((comment) => comment._id.toString() !== comment_id.toString());


        await post.save();
        const newPost = await Post.findById(request.params.post_id);

        response.status(200).json({
            status: 200,
            updatedComments: newPost.comments,
            message: "Comment Delete Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



// post View
router.put("/view/:post_id", auth, user, async (request, response) => {
    try {

        const { post_id } = request.params;
        const post = await Post.findById(post_id);
        const user = post.views.filter(function (item) {
            return item.user.toString() === request.user.id.toString();
        });

        if (user.length === 0) {
            const post = await Post.findById(request.params.post_id);
            post.views.push({
                user: request.user.id,
            });

            await post.save();

            response.status(200).json({
                status: 200,
                message: "View Successfully...",
            });
        } else {
            response.status(200).json({
                status: 200,
                message: "Already Viewed...",
            });
        }




    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})





// Likes

router.put("/like/:post_id", auth, user, async (request, response) => {
    try {


        const post = await Post.findById(request.params.post_id);
        post.likes.push({
            user: request.user.id,
        });

        await post.save();

        // Notification
        await Notification.create({
            user_id: post?.user.toString(),
            user: request.user.id,
            description: "like your photo",
            type: "Like"
        });

        // Reactions
        await Reaction.create({
            user: post?.user.toString(),
            reaction_user: request.user.id,
            description: "like your photo",
        });


        response.status(200).json({
            status: 200,
            message: "Like Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.put("/unlike/:post_id", auth, user, async (request, response) => {
    try {


        const post = await Post.findById(request.params.post_id);
        post.likes.pull({
            user: request.user.id,
        });

        await post.save();

        response.status(200).json({
            status: 200,
            message: "UnLike Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})




// Update Diamond
router.put("/diamond/:post_id", auth, user, async (request, response) => {
    try {

        const post = await Post.findByIdAndUpdate(request.params.post_id);
        await Post.findByIdAndUpdate(request.params.post_id, {
            $set: {
                diamonds: post.diamonds + request.body.diamonds,
                status: "Active"
            }
        },
            {
                new: true,
                useFindAndModify: false
            });

        response.status(200).json({
            status: 200,
            message: "Diamond Update Successfully...",
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
