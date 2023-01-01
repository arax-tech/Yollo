const mongoose = require('mongoose')

// Table Schema/Migration
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    caption: { type: String, required: true },
    who_can_see: { type: String, required: true },
    allow_comments: { type: Boolean, required: true },
    allow_reactions: { type: Boolean, required: true },
    allow_high_quality: { type: Boolean, required: true },
    diamonds: { type: Number, required: true },
    status: { type: String, default: "Active" },
    image: {
        public_id: { type: String },
        url: { type: String }
    },
    likes: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } }],
    comments: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true }, comment: { type: String }, createAt: { type: Date, default: Date.now } }],
    shares: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } }],
    views: [{ user: { type: mongoose.Schema.ObjectId, ref: "User", required: true } }],
    createAt: { type: Date, default: Date.now }
})



// Model
const Post = new mongoose.model("Post", postSchema);
module.exports = Post;