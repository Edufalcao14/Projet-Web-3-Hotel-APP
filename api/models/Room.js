const client = require('../db/db_config');

// ROOM MODEL
/**
 * @typedef {object} Room
 * @description This is the room model
 * @property {number} id_room - The id of the room
 * @property {string} name - The name of the room
 * @property {number} number - The number of the room
 * @property {number} floor - The floor number of the room
 * @property {string} bed_type - enum:Twin,Double,Double Comfort - The type of bed in the room
 * @property {string} status - enum:Available,Occupied,Cleaning,Repairing - The status of the room
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