require("dotenv").config();

const cloudinary = require("cloudinary")

const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express();
const PORT = process.env.PORT || 8000;


// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
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


// Auth Routes
app.use("/api/auth", require("./routes/auth"))

// User
app.use("/api/user", require("./routes/User/profile"));
app.use("/api/user/help/support", require("./routes/User/support"));

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