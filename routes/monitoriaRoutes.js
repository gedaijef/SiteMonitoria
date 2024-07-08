const express = require('express');
const router = express.Router();
const monitoriaController = require('../controllers/monitoriaController');

router.get('/', monitoriaController.getAlunosByCriteria);
router.post('/', monitoriaController.createMonitoria);

module.exports = router;