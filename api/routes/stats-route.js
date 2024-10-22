const express = require('express');
const router = express.Router();
const {getRoomsStats} = require('../models/Stats');

/**
 * GET /stats/rooms
 * @summary Returns statistics about rooms
 * @tags stats
 * @return {RoomsStats} 200 - Statistics about rooms are returned - application/json
 */
router.get('/rooms', async function (req, res) {
  const roomsStats = await getRoomsStats();
  res.send(roomsStats);
});

module.exports = router;
