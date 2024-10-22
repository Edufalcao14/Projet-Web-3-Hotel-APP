const client = require('../db/db_config');

/**
 * @typedef {object} Room
 * @description This is the room model
 * @property {number} room_id - The id of the room
 * @property {string} name - The name of the room
 * @property {number} number - The number of the room
 * @property {number} floor - The floor number of the room
 * @property {number} bed_type_id - The bed type id of the room
 * @property {string} bed_type - enum:Twin,Double,Double Comfort - The type of bed in the room
 * @property {number} room_status_id - The status id of the room
 * @property {string} current_status - enum:Available,Occupied,Cleaning,Repairing - The current status of the room
 * @property {number} room_type_id - The type id of the room
 * @property {string} type - enum:Standard,Extra Comfort,Business,Deluxe - The type of the room
 */

async function getAllRooms() {
  try {
    const stmt = await client.query('SELECT * FROM project.rooms_vw;');
    return stmt.rows;
  } catch (error) {
    throw new Error(`\nError fetching rooms: ${error.message}\n`);
  }
}

module.exports = {getAllRooms};