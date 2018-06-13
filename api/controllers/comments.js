const mongoose = require('mongoose');

const Comment = require('../models/comment');
const Post = require('../models/post');

exports.comments_get_all = (req, res, next) => {
    Comment.find()
        .select('comment_title comment_content')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                comments: docs.map(doc => {
                    return {
                        comment_title: doc.comment_title,
                        comment_content: doc.comment_content,
                        _id: doc._id,
                        resuest: {
                            type: 'GET',
                            url: 'http://localhost:3000/comments/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
}


exports.comments_create_comment = (req, res, next) => {
    Post.findById(req.body.post_id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                })
            }
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                post_id: req.body.post_id,
                comment_title: req.body.comment_title,
                comment_content: req.body.comment_content
            });
            return comment.save()

        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Handling comment requests to /comments',
                createdcomment: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });


}

exports.comments_get_comment = (req, res, next) => {
    const id = req.params.commentId;
    Comment.findById(id)
        .populate('post_id', '_id post_title post_content')
        .exec()
        .then(doc => {
            // console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


exports.comments_update_comment = (req, res, next) => {
    const id = req.params.commentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Comment.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
}


exports.comments_delete_comment = (req, res, next) => {
    const id = req.params.commentId;
    Comment.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
}