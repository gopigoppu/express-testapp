const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // console.log(new Date().getTime() + '-' + file.originalname);
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //accept a file
        cb(null, true);
    } else {
        // reject a file
        cb(new Error('File not supported'), false);
    }



}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Post = require('../models/post');

router.get('/', (req, res, next) => {
    Post.find()
        .select('post_title post_content post_image')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        post_title: doc.post_title,
                        post_content: doc.post_content,
                        post_image: doc.post_image,
                        _id: doc._id,
                        resuest: {
                            type: 'GET',
                            url: 'http://localhost:3000/posts/' + doc._id
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
});

router.post('/', upload.single('postImage'), (req, res, next) => {
    console.log(req.file);
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_image: req.file.path
    });
    post.save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /posts',
                createdPost: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });

});

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
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
});

router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Post.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});


router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});


module.exports = router;