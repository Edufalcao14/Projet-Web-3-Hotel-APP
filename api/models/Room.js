const client = require('../db_config');

// ROOM MODEL

async function getAllRooms() {
  try {
    const stmt = await client.query('SELECT * FROM project.rooms_vw;');
    return stmt.rows;
  } catch (error) {
    throw new Error(`\nError fetching rooms: ${error.message}\n`);
  }
}

module.exports = { getAllRooms };