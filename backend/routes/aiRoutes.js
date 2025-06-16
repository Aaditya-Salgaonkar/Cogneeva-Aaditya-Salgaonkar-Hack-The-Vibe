const express = require('express');
const router = express.Router();
const { generateOutput } = require('../controllers/aiController');

router.post('/generate', generateOutput);

module.exports = router;
