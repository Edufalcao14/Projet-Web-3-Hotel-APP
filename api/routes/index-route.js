const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;