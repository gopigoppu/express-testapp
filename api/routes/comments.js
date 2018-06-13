const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const commentsController = require('../controllers/comments');

router.get('/', commentsController.comments_get_all);

router.post('/', checkAuth, commentsController.comments_create_comment);

router.get('/:commentId', commentsController.comments_get_comment);

router.patch('/:commentId', checkAuth, commentsController.comments_update_comment);


router.delete('/:commentId', checkAuth, commentsController.comments_delete_comment);


module.exports = router;