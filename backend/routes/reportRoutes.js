const express = require('express');
const router = express.Router();
const { validateReport } = require('../schemas/schemas');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const reportController = require('../controllers/reportController')

// Crea un reporte
router.post('/new', validateReport, reportController.newReport);

// Retorna todos los reportes
router.post('/all', jwtMiddleware.verifyAdminToken, reportController.getAllReports);

// Retorna si un sitio es pornografico
router.post('/isPorn', reportController.isPorn);

// Modificar estado del reporte
router.post('/:id/updateStatus', jwtMiddleware.verifyAdminToken, reportController.updateReportState);

module.exports = router;