const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.get('/', turmaController.getAllTurmas);
router.get('/porSerie', turmaController.getTurmasBySerie);
router.get('/porSerieTeste', turmaController.getTurmasBySerieTeste);

module.exports = router;