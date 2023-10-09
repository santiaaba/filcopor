const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController')

// Get all states
router.get('/getStates', statesController.getAllStates);

// Get all cities
router.get('/getCities', statesController.getAllCities);

// Get state by ID
router.get('/state/:id', statesController.getStateById);

// Get city by ID
router.get('/city/:id', statesController.getCityById);

// Get cities by state
router.get('/cities/:stateId', statesController.getCitiesByStateId);

module.exports = router;
