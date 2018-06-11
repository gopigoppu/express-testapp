const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /posts'
    });
});

router.post('/', (req, res, next) => {
    const post = {
        post_title: req.body.post_title,
        post_content: req.body.post_content
    }
    res.status(200).json({
        message: 'Handling POST requests to /posts',
        createdPost: post
    });
});

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    if (id === 'special') {
        res.status(200).json({
            message: 'special id',
            id: id
        })
    } else {
        res.status(200).json({
            id: id
        })
    }
});

router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId;
    res.status(200).json({
        message: 'updated product',
        id: id
    });
});


router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    res.status(200).json({
        message: 'deleted product',
        id: id
    });
});


module.exports = router;