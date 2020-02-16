const express = require('express');
const authController = require('../controller/auth');
const authMiddleware = require('../auth_passport/auth-middleware');

const router = express.Router();


router.get('/login', authController.getLogin);

router.get('/register', authController.getSignup);

router.post('/register', authController.postSignup);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

module.exports = router; 