require("dotenv").config();

const cloudinary = require("cloudinary")

const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const cron = require('node-cron');


const app = express();
const PORT = process.env.PORT || 8000;


// Middlewares
app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(cookie());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));

app.use(express.static("public"));


// Database 
require("./database/config")


// Images Uploading Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Model

const Post = require("./models/Post");



cron.schedule('0 */1 * * * *', async () => {
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

    console.log('Diamonds Update in a every 1 minutes');
});


// Auth Routes
app.use("/api/auth", require("./routes/auth"))

// User
app.use("/api/user", require("./routes/User/user"));
app.use("/api/user/help/support", require("./routes/User/support"));
app.use("/api/user/tag", require("./routes/User/tag"));


// Posts
app.use("/api/user/post", require("./routes/User/post"));

app.use("/api/user/getstream", require("./routes/User/getstream"));

app.use("/api/user/post", require("./routes/User/post"));
app.use("/api/user/diamond", require("./routes/User/diamond"));
app.use("/api/user/notification", require("./routes/User/notification"));

// Server Listing At 
app.listen(PORT, () => {
    // console.log(`Server is Running at http://localhost:8000/`);
});




// Unhandeled Promise Rejection
process.on("unhandledRejection", (error) => {
    console.log(`Error : ${error.message}`);
    console.log("Shutting down the server due to Unhandeled Promise Rejection");

    server.close(() => {
        process.exit(1);
    })
})