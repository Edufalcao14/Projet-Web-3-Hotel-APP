const express = require('express');
const router = express.Router();
const {getAll, getServicesStats, getServicesRevenue} = require("../models/Service");


/**
 * GET /services
 * @summary Returns all services
 * @tags services
 * @return {Array<Service>} 200 - The services are returned - application/json
 */
router.get('/', async function (req, res) {
    const services = await getAll();
    res.send(services);
});

/**
 * GET /services/stats
 * @summary Returns the services statistics for today
 * @tags services
 * @return {Array<ServiceStats>} 200 - The services statistics are returned - application/json
 */
router.get('/stats', async function (req, res) {
    const stats = await getServicesStats();
    res.send(stats);
});

/**
 * GET /services/stats/year/:year
 * @summary Returns the services revenue for a specific year
 * @tags services
 * @param {number} year.path - The year for which the revenue is requested - eg: 2024
 * @return {Array<ServiceRevenue>} 200 - The services revenue is returned - application/json
 * @return {object} 400 - Invalid year format - application/json
 */
router.get('/stats/year/:year', async function (req, res) {
    const year = req.params.year;

    if (isNaN(year)) {
        return res.status(400).json(
            {error: 'Invalid year format. Please use a number.'});
    }

    const revenue = await getServicesRevenue(year);
    res.status(200).json(revenue);
});

module.exports = router;