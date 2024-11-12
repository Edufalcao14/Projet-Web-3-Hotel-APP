const express = require('express');
const router = express.Router();
const {getAllRooms} = require('../models/Room');
const {getTodayRoomsStats, getRoomsStats} = require("../models/Stats");

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

/**
 * GET /rooms/stats
 * @summary Returns statistics about rooms for today
 * @tags rooms
 * @return {TodayRoomsStats} 200 - Statistics about rooms are returned - application/json
 */
router.get('/stats', async function (req, res) {
  const roomsStats = await getTodayRoomsStats();
  res.status(200).json(roomsStats);
});

/**
 * GET /rooms/stats/:date
 * @summary Returns statistics about rooms for a specific date
 * @tags rooms
 * @param {string} date.path - The date for which the statistics are requested - eg: 2024-11-25
 * @return {RoomsStats} 200 - Statistics about rooms are returned - application/json
 * @return {object} 400 - Invalid date format - application/json
 */
router.get('/stats/:date', async function (req, res) {
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
