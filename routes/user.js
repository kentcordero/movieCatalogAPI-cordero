const express = require('express');
const { verify, verifyAdmin } = require('../auth');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/updateAdmin', verify, verifyAdmin, userController.changeToAdmin);

module.exports = router;