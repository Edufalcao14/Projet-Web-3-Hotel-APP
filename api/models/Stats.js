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
 *
 * @typedef {object} RoomsStats
 * @description This is the rooms statistics model
 * @property {number} total_rooms - The total number of rooms
 * @property {Array<StatusStats>} statuses_stats - The statistics of the rooms statuses
 * @property {Array<TypeStats>} types_stats - The statistics of the rooms types
 */

async function getRoomsStats() {
  try {
    const totalRooms = await client.query(
        'SELECT COUNT(*) FROM project.rooms_vw;');
    const statusesStats = await client.query(
        'SELECT status, COUNT(*) FROM project.rooms_vw GROUP BY status;');
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

module.exports = {getRoomsStats};