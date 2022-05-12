const express = require('express');
const router = express.Router();
const controller = require('../controllers/photo.controller');
const photo = require('../middlewares/photoValidations');
const middleware = require('../middlewares/auth');

router.post('/', middleware.verify, photo.validatePhoto, controller.addPhoto);
router.get('/', middleware.verify, controller.getPhoto);
router.put('/:photoid', middleware.verify, controller.editPhoto);
router.delete('/:photoid', middleware.verify, controller.deletePhoto);

module.exports = router;