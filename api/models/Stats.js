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
 * @property {number} totalReservedRooms - The total number of reserved rooms
 * @property {number} totalOccupiedRooms - The total number of occupied rooms
 * @property {Rooms} rooms - The rooms with their statuses
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
        `SELECT COUNT(*)
         FROM project.rooms_vw;`);
    const statusesStats = await client.query(
        `SELECT current_status, COUNT(*)
         FROM project.rooms_vw
         GROUP BY current_status;`);
    const typesStats = await client.query(
        `WITH booked_rooms AS (SELECT room
                               FROM project.reservations
                               WHERE (arrival_date < CURRENT_DATE AND departure_date > CURRENT_DATE)
                               GROUP BY room),
              available_rooms AS (SELECT rt.room_type_id,
                                         rt.name          AS room_type_name,
                                         COUNT(r.room_id) AS total_rooms
                                  FROM project.rooms r
                                           INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                                  GROUP BY rt.room_type_id, rt.name)
         SELECT ar.room_type_name                               AS type,
                (ar.total_rooms - COALESCE(br.booked_count, 0)) AS count
         FROM available_rooms ar
                  LEFT JOIN (SELECT rt.room_type_id, COUNT(r.room_id) AS booked_count
                             FROM project.rooms r
                                      INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                             WHERE r.room_id IN (SELECT room
                                                 FROM booked_rooms)
                             GROUP BY rt.room_type_id) br
                            ON ar.room_type_id = br.room_type_id
         ORDER BY ar.room_type_id;`);

    return {
      total_rooms: totalRooms.rows[0].count,
      statuses_stats: statusesStats.rows,
      types_stats: typesStats.rows
    };
  } catch (error) {
    throw new Error(`\nError fetching today's rooms stats: ${error.message}\n`);
  }
}

async function getRoomsStats(date) {
  try {
    const availableRooms = await client.query(
        `SELECT *
         FROM project.rooms_vw
         WHERE room_id NOT IN
               (SELECT room_id
                FROM project.reservations_vw
                WHERE ($1 BETWEEN arrival_date AND departure_date)
                  AND (
                    checked_in = FALSE OR
                    (checked_out = FALSE AND checked_in = TRUE)));`,
        [date]);

    const reservedRooms = await client.query(
        `SELECT *
         FROM project.rooms_vw
         WHERE room_id IN (SELECT room_id
                           FROM project.reservations_vw
                           WHERE ($1 BETWEEN arrival_date AND departure_date)
                             AND checked_in = FALSE);`,
        [date]);

    const occupiedRooms = await client.query(
        `SELECT *
         FROM project.rooms_vw
         WHERE room_id IN (SELECT room_id
                           FROM project.reservations_vw
                           WHERE ($1 BETWEEN arrival_date AND departure_date)
                             AND checked_in = TRUE
                             AND checked_out = FALSE);`,
        [date]);

    const typesStats = await client.query(
        `WITH booked_rooms AS (SELECT room
                               FROM project.reservations
                               WHERE (arrival_date < $1 AND departure_date > $1)
                               GROUP BY room),
              available_rooms AS (SELECT rt.room_type_id,
                                         rt.name          AS room_type_name,
                                         COUNT(r.room_id) AS total_rooms
                                  FROM project.rooms r
                                           INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                                  GROUP BY rt.room_type_id, rt.name)
         SELECT ar.room_type_name                               AS type,
                (ar.total_rooms - COALESCE(br.booked_count, 0)) AS count
         FROM available_rooms ar
                  LEFT JOIN (SELECT rt.room_type_id, COUNT(r.room_id) AS booked_count
                             FROM project.rooms r
                                      INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                             WHERE r.room_id IN (SELECT room
                                                 FROM booked_rooms)
                             GROUP BY rt.room_type_id) br
                            ON ar.room_type_id = br.room_type_id
         ORDER BY ar.room_type_id;`,
        [date]);

    return {
      totalAvailableRooms: availableRooms.rows.length,
      totalReservedRooms: reservedRooms.rows.length,
      totalOccupiedRooms: occupiedRooms.rows.length,
      rooms: {
        available: availableRooms.rows,
        reserved: reservedRooms.rows,
        occupied: occupiedRooms.rows
      },
      types_stats: typesStats.rows
    };
  } catch (error) {
    throw new Error(`\nError fetching rooms stats: ${error.message}\n`);
  }
}

module.exports = {getTodayRoomsStats, getRoomsStats};