const express = require('express');
const router = express.Router();
const {
    getAllReservations,
    getTodayReservationsStats,
    getReservationsPrediction,
    getReservationsHistory, updateReservation
} = require("../models/Reservation");

/**
 * GET /reservations
 * @summary Returns all reservations
 * @tags reservations
 * @return {Array<Reservation>} 200 - All reservations are returned - application/json
 */
router.get('/', async function (req, res) {
    const reservations = await getAllReservations();
    res.send(reservations);
});

/**
 * GET /reservations/stats
 * @summary Returns statistics about reservations for today
 * @tags reservations
 * @return {ReservationsStats} 200 - Statistics about reservations are returned - application/json
 */
router.get('/stats', async function (req, res) {
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
router.get('/partners/stats/:nbrDays', async function (req, res) {
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

/**
 * POST /reservations/:id/check-in
 * @summary Check-in a reservation
 * @tags reservations
 * @param {string} id.path - The id of the reservation to check-in - eg: 1
 * @return {Reservation} 200 - The reservation is checked-in - application/json
 * @return {object} 404 - Reservation not found - application/json
 */
router.post('/:id/check-in', async function (req, res) {
    const id = parseInt(req.params.id, 10);
    const reservation = await updateReservation(id, {checked_in: true});

    if (!reservation) {
        return res.status(404).json({error: 'Reservation not found.'});
    }

    res.status(200).json(reservation);
});

/**
 * POST /reservations/:id/check-out
 * @summary Check-out a reservation
 * @tags reservations
 * @param {string} id.path - The id of the reservation to check-out - eg: 1
 * @return {Reservation} 200 - The reservation is checked-out - application/json
 * @return {object} 404 - Reservation not found - application/json
 */
router.post('/:id/check-out', async function (req, res) {
    const id = parseInt(req.params.id, 10);
    const reservation = await updateReservation(id, {checked_out: true});

    if (!reservation) {
        return res.status(404).json({error: 'Reservation not found.'});
    }

    res.status(200).json(reservation);
});

module.exports = router;