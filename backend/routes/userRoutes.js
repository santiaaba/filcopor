const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController')

// Get user by ID
router.get('/:id', jwtMiddleware.verifyToken, userController.getUserById);

// Get a user by email
router.get('/email/:email', jwtMiddleware.verifyToken, userController.getUserByEmail);

// Check if an email exists in db
router.get('/check-email/:email', userController.checkEmail);

module.exports = router;
