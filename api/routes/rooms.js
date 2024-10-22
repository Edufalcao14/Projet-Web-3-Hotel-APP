const express = require('express');
const router = express.Router();
const {getAllRooms} = require('../models/Room');

/* GET - Get all rooms */
router.get('/', async function (req, res) {
  const rooms = await getAllRooms();
  res.send(rooms);
});

module.exports = router;
