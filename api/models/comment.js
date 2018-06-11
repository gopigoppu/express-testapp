const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment_title: { type: String, required: true },
    comment_content: { type: String, default: "Sample comment content", required: true }
});

module.exports = mongoose.model('Comment', commentSchema);