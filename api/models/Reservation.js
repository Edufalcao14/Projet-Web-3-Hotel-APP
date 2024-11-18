const client = require('../db/db_config');

/**
 * @typedef {object} ReservationsStats
 * @property {number} awaiting - The number of reservations awaiting check-in
 * @property {number} in_home - The number of reservations currently in home
 * @property {number} checked_out - The number of reservations checked out
 * @property {number} total - The total number of reservations
 * @description This is the reservation stats model
 */

/**
 * @typedef {object} Reservation
 * @property {number} reservation_id - The reservation ID
 * @property {number} client_id - The client ID
 * @property {string} client_first_name - The client first name
 * @property {string} client_last_name - The client last name
 * @property {string} client_email - The client email
 * @property {string} client_phone_number - The client phone number
 * @property {number} room_id - The room ID
 * @property {string} room_name - The room name
 * @property {number} room_floor - The room floor
 * @property {number} room_number - The room number
 * @property {string} room_type - The room type
 * @property {string} room_status - The room status
 * @property {number} partner_id - The partner ID
 * @property {string} partner_name - The partner name
 * @property {number} total_price - The total price
 * @property {boolean} is_paid - The payment status
 * @property {number} payment_id - The payment ID
 * @property {string} payment_type - The payment type
 * @property {string} arrival_date - The arrival date
 * @property {string} departure_date - The departure date
 * @property {boolean} checked_in - The check-in status
 * @property {boolean} checked_out - The check-out status
 * @property {string} services - The reservation services
 * @description This is the reservation model
 */

/**
 * @typedef {object} ReservationsPrediction
 * @property {Array<partnerReservations>} count - The number of reservations for each partner
 * @property {Array<partnerStats>} stats - The total number of reservations for each partner
 * @description This is the reservations prediction model
 */

/**
 * @typedef {object} ReservationsHistory
 * @property {Array<partnerReservations>} count - The number of reservations for each partner
 * @property {Array<partnerStats>} stats - The total number of reservations for each partner
 */

/**
 * @typedef {object} partnerReservations
 * @property {string} date - The date
 * @property {string} partner_name - The partner name
 * @property {number} count - The number of reservations for the partner
 * @description This is the partner reservations model
 */

/**
 *  @typedef {object} partnerStats
 *  @property {string} partner_name - The partner name
 *  @property {number} total - The total number of reservations for the partner
 *  @description This is the partner stats model
 */

async function getAllReservations() {
    try {
        const reservations = await client.query(`SELECT *
                                                 FROM project.reservations_grouped_vw
                                                 WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date;`);
        return reservations.rows;
    } catch (error) {
        throw error;
    }
}

async function getTodayReservationsStats() {
    try {
        const reservationsStats = await client.query(`SELECT COUNT(reservation_id)
                                                             FILTER (WHERE checked_in = FALSE AND checked_out = FALSE)         AS awaiting,
                                                             COUNT(*) FILTER (WHERE checked_in = TRUE AND checked_out = FALSE) AS in_home,
                                                             COUNT(*)
                                                             FILTER (WHERE checked_in = TRUE AND checked_out = TRUE)           AS checked_out,
                                                             COUNT(reservation_id)                                             AS total
                                                      FROM project.reservations
                                                      WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date;`);
        return reservationsStats.rows[0];
    } catch (error) {
        throw error;
    }
}

async function getReservationsPrediction(nbrDays) {
    try {
        const count = await client.query(`SELECT arrival_date AS date, partner_name, COUNT(reservation_id) AS count
                                          FROM project.reservations_grouped_vw
                                          WHERE arrival_date BETWEEN CURRENT_DATE AND CURRENT_DATE + ${nbrDays}
                                          GROUP BY arrival_date, partner_name
                                          ORDER BY arrival_date;`);
        const stats = await client.query(`WITH stats
                                                   AS (SELECT arrival_date, partner_name, COUNT(reservation_id) AS count
                                                       FROM project.reservations_grouped_vw
                                                       WHERE arrival_date BETWEEN CURRENT_DATE AND CURRENT_DATE + ${nbrDays}
                                                       GROUP BY arrival_date, partner_name
                                                       ORDER BY arrival_date)
                                          SELECT partner_name, SUM(count) AS total
                                          FROM stats
                                          GROUP BY partner_name;`);

        return {count: count.rows, stats: stats.rows};
    } catch (error) {
        throw error;
    }
}

async function getReservationsHistory(nbrDays) {
    try {
        const count = await client.query(`SELECT arrival_date AS date, partner_name, COUNT(reservation_id) AS count
                                          FROM project.reservations_grouped_vw
                                          WHERE arrival_date BETWEEN CURRENT_DATE - ${nbrDays} AND CURRENT_DATE
                                          GROUP BY arrival_date, partner_name
                                          ORDER BY arrival_date;`);
        const stats = await client.query(`WITH stats
                                                   AS (SELECT arrival_date, partner_name, COUNT(reservation_id) AS count
                                                       FROM project.reservations_grouped_vw
                                                       WHERE arrival_date BETWEEN CURRENT_DATE - ${nbrDays} AND CURRENT_DATE
                                                       GROUP BY arrival_date, partner_name
                                                       ORDER BY arrival_date)
                                          SELECT partner_name, SUM(count) AS total
                                          FROM stats
                                          GROUP BY partner_name;`);

        return {count: count.rows, stats: stats.rows};
    } catch (error) {
        throw error;
    }
}

module.exports = {getAllReservations, getTodayReservationsStats, getReservationsPrediction, getReservationsHistory};