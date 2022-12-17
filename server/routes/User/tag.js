const express = require("express")
const cloudinary = require("cloudinary")

const router = express.Router()


// Middlewares
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")


// Model 
const User = require("../../models/User")
const Tag = require("../../models/Tag")



router.get("/", auth, user, async (request, response) => {
    try {
        const tags = await Tag.find();
        response.status(200).json({
            status: 200,
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


router.post("/store", auth, user, async (request, response) => {

    try {
        const user_id = request.user.id;
        const { name } = request.body;

        await Tag.create({ user_id, name });

        response.status(201).json({
            status: 201,
            message: "Tag Create Successfully..."
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




module.exports = router;
