const router = require("./index-route");
const {
    getAllReservations,
    getTodayReservationsStats,
    getReservationsPrediction,
    getReservationsHistory
} = require("../models/Reservation");

/**
 * GET /reservations
 * @summary Returns all reservations
 * @tags reservations
 * @return {Array<Reservation>} 200 - All reservations are returned - application/json
 */
router.get('/reservations', async function (req, res) {
    const reservations = await getAllReservations();
    res.send(reservations);
});

/**
 * GET /reservations/stats
 * @summary Returns statistics about reservations for today
 * @tags reservations
 * @return {ReservationsStats} 200 - Statistics about reservations are returned - application/json
 */
router.get('/reservations/stats', async function (req, res) {
    const reservationsStats = await getTodayReservationsStats();
    res.status(200).json(reservationsStats);
});

/**
 * GET /reservations/partners/stats/:nbrDays
 * @summary Returns statistics about reservations for the last n days or the next n days
 * @tags reservations
 * @param {number} nbrDays.path - The number of days for which the statistics are requested, if negative the statistics are for the past, if positive the statistics are for the future - eg: 7
 * @return {ReservationsPrediction} 200 - Statistics about future reservations are returned - application/json
 * @return {ReservationsHistory} 200 - Statistics about past reservations are returned - application
 * @return {object} 400 - Invalid number of days - application/json
 */
router.get('/reservations/partners/stats/:nbrDays', async function (req, res) {
    const nbrDays = parseInt(req.params.nbrDays, 10);

    if (isNaN(nbrDays)) {
        return res.status(400).json({error: 'Invalid number of days.'});
    }

    let result;

    if (nbrDays < 0) {
        result = await getReservationsHistory(Math.abs(nbrDays));
    } else {
        result = await getReservationsPrediction(nbrDays);
    }

    res.status(200).json(result);
});

module.exports = router;