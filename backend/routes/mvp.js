const express = require('express');
const router = express.Router();
const { generateMVP, downloadZip } = require('../controllers/mvpController');

router.post('/generate', generateMVP);
router.get('/download/:projectName', downloadZip);

module.exports = router;
