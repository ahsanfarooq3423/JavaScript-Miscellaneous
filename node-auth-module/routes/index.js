const express = require('express');
const indexController = require('../controller/index');
const authMiddleware = require('../auth_passport/auth-middleware');

const router = express.Router();


router.get('/',indexController.getIndex);

router.get('/dashboard', authMiddleware, indexController.getDashboard);


module.exports = router; 