const express = require('express');
const router = express.Router();
const codeAnalysisController = require('../controllers/codeAnalysisController');

router.post('/analyze', codeAnalysisController.analyzeCode);

module.exports = router;
