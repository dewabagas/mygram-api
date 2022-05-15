const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment.controller');
const comment = require('../middlewares/commentValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, comment.validateComment, controller.addComment);
router.get('/', middleware.verify, controller.getComment);
router.put('/:commentid', middleware.verify, comment.validateComment_update, controller.editComment);
router.delete('/:commentid', middleware.verify, comment.params_commentid, controller.deleteComment);

module.exports = router;