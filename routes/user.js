const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')
const user = require('../middlewares/user');
const middleware = require('../middlewares/auth')

router.post('/register', user.validateUserRegister, controller.register);
router.post('/login', user.validateUserLogin, controller.login);
router.put('/:userId', middleware.verify,  controller.editUser);

module.exports = router;