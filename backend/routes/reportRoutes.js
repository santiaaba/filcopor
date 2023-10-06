const express = require('express');
const router = express.Router();
const { validateReport } = require('../schemas/schemas');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const reportController = require('../controllers/reportController')

// Crea un reporte
router.post('/new', jwtMiddleware.verifyToken, validateReport, reportController.newReport);

// Retorna todos los reportes
router.post('/all', jwtMiddleware.verifyToken, reportController.getAllReports);

module.exports = router;
