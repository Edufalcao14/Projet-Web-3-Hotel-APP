const express = require('express');
const router = express.Router();
const {getTodayRoomsStats, getRoomsStats} = require('../models/Stats');

/**
 * GET /stats/rooms
 * @summary Returns statistics about rooms for today
 * @tags stats
 * @return {TodayRoomsStats} 200 - Statistics about rooms are returned - application/json
 */
router.get('/rooms', async function (req, res) {
  const roomsStats = await getTodayRoomsStats();
  res.status(200).json(roomsStats);
});

/**
 * GET /stats/rooms/:date
 * @summary Returns statistics about rooms for a specific date
 * @tags stats
 * @param {string} date.path - The date for which the statistics are requested - eg: 2024-01-01
 * @return {RoomsStats} 200 - Statistics about rooms are returned - application/json
 * @return {object} 400 - Invalid date format - application/json
 */
router.get('/rooms/:date', async function (req, res) {
  const date = req.params.date;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json(
        {error: 'Invalid date format. Please use YYYY-MM-DD.'});
  }

  const roomsStats = await getRoomsStats(date);
  res.status(200).json(roomsStats);
});

module.exports = router;
