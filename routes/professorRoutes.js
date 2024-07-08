const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.getAllProfessores);

module.exports = router;