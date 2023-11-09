const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { validateFqdn } = require('../schemas/schemas');
const fqdnController = require('../controllers/fqdnController')

// Crea un fqdn
router.post('/new', validateFqdn, jwtMiddleware.verifyAdminToken, fqdnController.newFqdn);

// Get fqdn by ID
router.get('/:id', fqdnController.getFqdnById);

// Modifica un fqdn by ID
router.put('/:id', jwtMiddleware.verifyAdminToken, fqdnController.updateFqdn);

module.exports = router;
