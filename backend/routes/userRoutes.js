const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController')

// Get user by ID
router.get('/:id', jwtMiddleware.verifyToken, userController.getUserById);

module.exports = router;

