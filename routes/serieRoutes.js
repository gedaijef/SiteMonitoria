const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');

router.get('/', serieController.getAllSeries);

module.exports = router;