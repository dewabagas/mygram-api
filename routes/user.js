const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')
const user = require('../middlewares/user');

router.post('/register', user.validateUserRegister, controller.register);
router.post('/login', user.validateUserLogin, controller.login);

module.exports = router;