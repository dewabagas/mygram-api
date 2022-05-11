const express = require('express');
const router = express.Router();
const controller = require('../controllers/socialMedia.controller')
const socialMedia = require('../middlewares/socialMediaValidations');
const middleware = require('../middlewares/auth')

router.post('/', middleware.verify, socialMedia.validateSocialMedia, controller.addSocialMedia);
router.get('/', middleware.verify, controller.getSocialMedia);
router.put('/:socialMediaId', middleware.verify,  socialMedia.validateSocialMedia, controller.editSocialMedia);
router.delete('/:socialMediaId', middleware.verify, controller.deleteSocialMedia);

module.exports = router;
