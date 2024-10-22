const express = require('express');
const router = express.Router();
const {getAllRooms} = require('../models/Room');

/**
 * GET /rooms
 * @summary Returns all rooms
 * @tags rooms
 * @return {Array<Room>} 200 - All rooms are returned - application/json
 */
router.get('/', async function (req, res) {
  const rooms = await getAllRooms();
  res.send(rooms);
});

module.exports = router;
