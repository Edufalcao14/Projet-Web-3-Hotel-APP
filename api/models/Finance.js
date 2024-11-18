const client = require('../db/db_config');

/**
 * @typedef {object} FinancePrediction
 * @property {number} prediction - The predicted revenue for the month
 * @property {number} paid - The revenue from paid reservations for the month
 * @property {number} unpaid - The revenue from unpaid reservations for the month
 * @description This is the finance prediction model
 */

/**
 * @typedef {object} FinanceRevenue
 * @property {number} revenue - The total revenue for the last n days
 * @property {Array<RevenueByPaymentType>} revenue_by_payment_type - The revenue by payment type for the last n days
 * @property {object} revenue_by_card - The revenue by card for the last n days
 * @property {object} revenue_by_cash - The revenue by cash for the last n days
 * @description This is the finance revenue model
 */

/**
 * @typedef {object} RevenueByPaymentType
 * @property {string} payment_type - The payment type
 * @property {number} revenue - The revenue for the payment type
 * @property {number} total - The total number of reservations for the payment type
 * @description This is the revenue by payment type model
 */

/**
 * @typedef {object} RevenueStats
 * @property {string} date - The date
 * @property {number} card_revenue - The revenue from card payments
 * @property {number} cash_revenue - The revenue from cash payments
 * @description This is the revenue stats model
 */

/**
 * @typedef {object} RevenueByRoomType
 * @property {Array<RoomTypeRevenue>} room_type_revenue - The revenue by room type for each month
 * @description This is the revenue by month and room type model
 */

/**
 * @typedef {object} RoomTypeRevenue
 * @property {string} room_type - The type of room
 * @property {Array<MonthlyRevenue>} monthly_revenue - The revenue for each month
 * @description This is the revenue by room type model
 */

/**
 * @typedef {object} MonthlyRevenue
 * @property {string} month - The month
 * @property {number} revenue - The revenue for the month
 * @property {number} count - The total number of reservations for the month
 * @description This is the monthly revenue model
 */


async function getPrediction(date) {
    try {
        const predictionQuery = `
            SELECT SUM(total_price) AS revenue_prediction
            FROM project.reservations_grouped_vw
            WHERE (DATE_PART('month', departure_date::timestamp) =
                   DATE_PART('month', $1::timestamp))
              AND (DATE_PART('year', departure_date::timestamp) =
                   DATE_PART('year', $1::timestamp));
        `;
        const paidQuery = `
            SELECT SUM(total_price) AS revenue_paid
            FROM project.reservations_grouped_vw
            WHERE (DATE_PART('month', departure_date::timestamp) =
                   DATE_PART('month', $1::timestamp))
              AND (DATE_PART('year', departure_date::timestamp) =
                   DATE_PART('year', $1::timestamp))
              AND is_paid = TRUE;
        `;
        const unpaidQuery = `
            SELECT SUM(total_price) AS revenue_unpaid
            FROM project.reservations_grouped_vw
            WHERE (DATE_PART('month', departure_date::timestamp) =
                   DATE_PART('month', $1::timestamp))
              AND (DATE_PART('year', departure_date::timestamp) =
                   DATE_PART('year', $1::timestamp))
              AND is_paid = FALSE;
        `;

        const prediction = await client.query(predictionQuery, [date]);
        const paid = await client.query(paidQuery, [date]);
        const unpaid = await client.query(unpaidQuery, [date]);

        return {
            prediction: prediction.rows[0]?.revenue_prediction || 0,
            paid: paid.rows[0]?.revenue_paid || 0,
            unpaid: unpaid.rows[0]?.revenue_unpaid || 0,
        };
    } catch (error) {
        console.error(`Error getting prediction: ${error.message}`);
        throw error;
    }
}

async function getRevenue(nbrDays) {
    try {
        const interval = `${nbrDays} days`;

        const revenueQuery = `
            SELECT SUM(total_price) AS revenue
            FROM project.reservations_grouped_vw
            WHERE departure_date BETWEEN CURRENT_DATE - INTERVAL '${interval}' AND CURRENT_DATE
              AND is_paid = TRUE;
        `;
        const revenueByPaymentTypeQuery = `
            SELECT payment_type_name     AS payment_type,
                   SUM(total_price)      AS revenue,
                   COUNT(reservation_id) AS total
            FROM project.reservations_grouped_vw
            WHERE departure_date BETWEEN CURRENT_DATE - INTERVAL '${interval}' AND CURRENT_DATE
              AND is_paid = TRUE
            GROUP BY payment_type_name;
        `;
        const revenueByCardQuery = `
            SELECT SUM(total_price) AS revenue, COUNT(reservation_id) AS total
            FROM project.reservations_grouped_vw
            WHERE departure_date BETWEEN CURRENT_DATE - INTERVAL '${interval}' AND CURRENT_DATE
              AND is_paid = TRUE
              AND payment_type_name != 'Cash';
        `;
        const revenueByCashQuery = `
            SELECT SUM(total_price) AS revenue, COUNT(reservation_id) AS total
            FROM project.reservations_grouped_vw
            WHERE departure_date BETWEEN CURRENT_DATE - INTERVAL '${interval}' AND CURRENT_DATE
              AND is_paid = TRUE
              AND payment_type_name = 'Cash';
        `;

        const revenue = await client.query(revenueQuery);
        const revenueByPaymentType = await client.query(revenueByPaymentTypeQuery);
        const revenueByCard = await client.query(revenueByCardQuery);
        const revenueByCash = await client.query(revenueByCashQuery);

        return {
            revenue: revenue.rows[0]?.revenue || 0,
            revenue_by_payment_type: revenueByPaymentType.rows,
            revenue_by_card: revenueByCard.rows[0] || {revenue: 0, total: 0},
            revenue_by_cash: revenueByCash.rows[0] || {revenue: 0, total: 0},
        };
    } catch (error) {
        console.error(`Error getting revenue: ${error.message}`);
        throw error;
    }
}

async function getRevenueStats(nbrDays) {
    try {
        const interval = `${nbrDays} days`;

        const revenue = await client.query(
            `SELECT departure_date                                                         AS date,
                    SUM(CASE WHEN payment_type_name != 'Cash' THEN total_price ELSE 0 END) AS card_revenue,
                    SUM(CASE WHEN payment_type_name = 'Cash' THEN total_price ELSE 0 END)  AS cash_revenue
             FROM project.reservations_grouped_vw
             WHERE (departure_date BETWEEN CURRENT_DATE - INTERVAL '${interval}' AND CURRENT_DATE)
               AND is_paid = TRUE
             GROUP BY departure_date
             ORDER BY departure_date;`
        );

        return revenue.rows;
    } catch (error) {
        console.error(`Error getting revenue stats: ${error.message}`);
    }
}

async function getRevenueByRoomType(year) {
    try {
        const baseMonthlyRevenue = [
            {month: "Janvier", revenue: 0, count: 0},
            {month: "Février", revenue: 0, count: 0},
            {month: "Mars", revenue: 0, count: 0},
            {month: "Avril", revenue: 0, count: 0},
            {month: "Mai", revenue: 0, count: 0},
            {month: "Juin", revenue: 0, count: 0},
            {month: "Juillet", revenue: 0, count: 0},
            {month: "Août", revenue: 0, count: 0},
            {month: "Septembre", revenue: 0, count: 0},
            {month: "Octobre", revenue: 0, count: 0},
            {month: "Movember 🥸", revenue: 0, count: 0},
            {month: "Décembre", revenue: 0, count: 0}
        ];

        const roomTypeRevenues = {};

        for (let month = 1; month <= 12; month++) {
            const query = `
                SELECT rt.name                 AS room_type,
                       SUM(r.total_price)      AS revenue,
                       COUNT(r.reservation_id) AS count
                FROM project.room_types rt
                         LEFT OUTER JOIN project.reservations_grouped_vw r ON rt.name = r.room_type
                WHERE DATE_PART('month', r.departure_date) = $1
                  AND DATE_PART('year', r.departure_date) = $2
                  AND r.is_paid = TRUE
                GROUP BY rt.name;
            `;

            const result = await client.query(query, [month, year]);

            result.rows.forEach(row => {
                const roomType = row.room_type;
                if (!roomTypeRevenues[roomType]) {
                    roomTypeRevenues[roomType] = {
                        room_type: roomType,
                        monthly_revenue: JSON.parse(JSON.stringify(baseMonthlyRevenue))
                    };
                }
                roomTypeRevenues[roomType].monthly_revenue[month
                - 1].revenue = row.revenue || 0;
                roomTypeRevenues[roomType].monthly_revenue[month - 1].count = row.count
                    || 0;
            });
        }

        return Object.values(roomTypeRevenues);
    } catch (error) {
        console.error(`Error getting revenue by room type: ${error.message}`);
        throw error;
    }
}

module.exports = {
    getPrediction,
    getRevenue,
    getRevenueStats,
    getRevenueByRoomType
};
