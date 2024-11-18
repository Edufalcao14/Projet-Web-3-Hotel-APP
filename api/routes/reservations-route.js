const router = require("./index-route");
const {
    getAllReservations,
    getTodayReservationsStats,
    getReservationsPrediction,
    getReservationsHistory
} = require("../models/Reservation");

router.get('/reservations', async function (req, res) {
    const reservations = await getAllReservations();
    res.send(reservations);
});

router.get('/reservations/stats', async function (req, res) {
    const reservationsStats = await getTodayReservationsStats();
    res.status(200).json(reservationsStats);
});

router.get('/reservations/partners/stats/:nbrDays', async function (req, res) {
    const nbrDays = req.params.nbrDays;

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