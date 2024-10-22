const client = require('../db/db_config');

/**
 * @typedef {object} StatusStats
 * @description This is the status statistics model
 * @property {string} status - The status of the rooms
 * @property {number} count - The number of rooms with the status
 */

/**
 * @typedef {object} TypeStats
 * @description This is the type statistics model
 * @property {string} type - The type of the rooms
 * @property {number} count - The number of rooms with the type
 */

/**
 * @typedef {object} RoomsStats
 * @description This is the rooms statistics model
 * @property {number} totalAvailableRooms - The total number of available rooms
 * @property {Array<Room>} availableRooms - The available rooms
 * @property {number} totalReservedRooms - The total number of reserved rooms
 * @property {Array<Room>} reservedRooms - The reserved rooms
 * @property {Array<TypeStats>} types_stats - The statistics of the rooms types
 */

/**
 *
 * @typedef {object} TodayRoomsStats
 * @description This is the rooms today's statistics model
 * @property {number} total_rooms - The total number of rooms
 * @property {Array<StatusStats>} statuses_stats - The statistics of the rooms statuses
 * @property {Array<TypeStats>} types_stats - The statistics of the rooms types
 */

async function getTodayRoomsStats() {
  try {
    const totalRooms = await client.query(
        'SELECT COUNT(*) FROM project.rooms_vw;');
    const statusesStats = await client.query(
        'SELECT current_status, COUNT(*) FROM project.rooms_vw GROUP BY current_status;');
    const typesStats = await client.query(
        'SELECT type, COUNT(*) FROM project.rooms_vw GROUP BY type;');

    return {
      total_rooms: totalRooms.rows[0].count,
      statuses_stats: statusesStats.rows,
      types_stats: typesStats.rows
    };
  } catch (error) {
    throw new Error(`\nError fetching rooms: ${error.message}\n`);
  }
}

async function getRoomsStats(date) {
  try {
    const availableRooms = await client.query(
        'SELECT * FROM project.rooms_vw WHERE room_id NOT IN (SELECT room_id FROM project.reservations_vw WHERE $1 BETWEEN arrival_date AND departure_date);',
        [date]);
    const reservedRooms = await client.query(
        'SELECT * FROM project.rooms_vw WHERE room_id IN (SELECT room_id FROM project.reservations_vw WHERE $1 BETWEEN arrival_date AND departure_date);',
        [date]);
    const typesStats = await client.query(
        'SELECT type, COUNT(*) FROM project.rooms_vw WHERE room_id NOT IN (SELECT room_id FROM project.reservations_vw WHERE $1 BETWEEN arrival_date AND departure_date) GROUP BY type;',
        [date]);

    return {
      totalAvailableRooms: availableRooms.rows.length,
      availableRooms: availableRooms.rows,
      totalReservedRooms: reservedRooms.rows.length,
      reservedRooms: reservedRooms.rows,
      types_stats: typesStats.rows
    };
  } catch (error) {
    throw new Error(`\nError fetching rooms: ${error.message}\n`);
  }
}

module.exports = {getTodayRoomsStats, getRoomsStats};