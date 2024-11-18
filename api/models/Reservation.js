const client = require('../db/db_config');

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
                                          ORDER BY arrival_date;`, [nbrDays]);
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