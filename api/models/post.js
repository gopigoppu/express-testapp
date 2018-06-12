const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_title: { type: String, required: true },
    post_content: { type: String, default: "Sample post content", required: true },
    post_image: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);