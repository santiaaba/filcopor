const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { validateRegister, validateLogin } = require('../schemas/schemas');
const authController = require('../controllers/authController');


// Registra a un usuario
router.post('/register', validateRegister, authController.register);

// Logea  a un usuario
router.post('/login', validateLogin, authController.login);

// Deslogea a un usuario
router.post('/logout', jwtMiddleware.verifyToken, authController.logout);

module.exports = router;

