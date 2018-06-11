const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /comments'
    });
});

router.post('/', (req, res, next) => {
    const comment = {
        comment_title: req.body.comment_title,
        comment_content: req.body.comment_content
    }
    res.status(200).json({
        message: 'Handling POST requests to /comments',
        createdPost: comment
    });
});

router.get('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
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

router.patch('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    res.status(200).json({
        message: 'updated commentId',
        id: id
    });
});


router.delete('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    res.status(200).json({
        message: 'deleted commentId',
        id: id
    });
});


module.exports = router;