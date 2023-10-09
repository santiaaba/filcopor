const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController')

// Get user by ID
router.get('/:id', jwtMiddleware.verifyToken, userController.getUserById);

// Get a user by username
router.get('/email/:email', jwtMiddleware.verifyToken, userController.getUserByEmail);

module.exports = router;
