const client = require('../db/db_config');

/**
 * @typedef {object} Service
 * @property {string} service - The name of the service
 * @property {string} client_first_name - The first name of the client
 * @property {string} client_last_name - The last name of the client
 * @property {string} client_email - The email of the client
 * @property {string} client_phone_number - The phone number of the client
 * @property {string} room_name - The name of the room
 * @property {number} reservation_id - The reservation id
 * @description This is the service model
 */

/**
 * @typedef {object} ServiceStats
 * @property {string} service - The name of the service
 * @property {number} count - The number of reservations for the service
 * @description This is the service stats model
 */

/**
 * @typedef {object} ServiceRevenue
 * @property {string} month - The month
 * @property {Array<ServiceRevenueData>} data - The revenue data for the month
 * @description This is the service revenue model
 */

/**
 * @typedef {object} ServiceRevenueData
 * @property {string} service - The name of the service
 * @property {number} revenue - The revenue for the service
 * @description This is the service revenue data model
 */

async function getAll() {
    try {
        const query = `
            SELECT service_name AS service,
                   client_first_name,
                   client_last_name,
                   client_email,
                   client_phone_number,
                   room_name,
                   reservation_id
            FROM project.reservations_vw
            WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date
              AND service_name IS NOT NULL
            ORDER BY client_last_name, client_first_name, room_name;
        `;
        const {rows} = await client.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getServicesStats() {
    try {
        const query = `
            SELECT COALESCE(service_name, 'None') AS service, COUNT(reservation_id) AS count
            FROM project.reservations_vw
            WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date
            GROUP BY service_name;
        `;
        const {rows} = await client.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getServicesRevenue(year) {
    const months = {
        1: 'Janvier',
        2: 'Février',
        3: 'Mars',
        4: 'Avril',
        5: 'Mai',
        6: 'Juin',
        7: 'Juillet',
        8: 'Août',
        9: 'Septembre',
        10: 'Octobre',
        11: 'Movember 🥸',
        12: 'Décembre',
    }

    try {
        const results = [];
        for (let month = 1; month <= 12; month++) {
            const query = `
                WITH nbr_services AS (SELECT service_id, COUNT(reservation_id) AS count
                                      FROM project.reservations_vw
                                      WHERE date_part('month', arrival_date) = $1
                                        AND date_part('year', arrival_date) = $2
                                        AND is_paid = TRUE
                                      GROUP BY service_id)
                SELECT service_name AS service, SUM(n.count * s.price * (departure_date - arrival_date)) AS revenue
                FROM project.reservations_vw r
                         INNER JOIN project.services s ON r.service_id = s.service_id
                         INNER JOIN nbr_services n ON n.service_id = r.service_id
                WHERE date_part('month', arrival_date) = $1
                  AND date_part('year', arrival_date) = $2
                  AND is_paid = TRUE
                GROUP BY service;
            `;
            const {rows} = await client.query(query, [month, year]);
            results.push({month: months[month], data: rows});
        }
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    getServicesStats,
    getServicesRevenue,
};