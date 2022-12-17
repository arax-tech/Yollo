const mongoose = require('mongoose')

// Table Schema/Migration
const tagSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    icon: { type: String, default: '../../assets/images/tags/cup-hot.png' },
    createAt: { type: Date, default: Date.now }

})


// Model
const Tag = new mongoose.model("Tag", tagSchema);
module.exports = Tag;