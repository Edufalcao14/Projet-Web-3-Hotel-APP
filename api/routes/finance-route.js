const express = require('express');
const router = express.Router();
const {
  getPrediction,
  getRevenue,
  getRevenueStats,
  getRevenueByRoomType
} = require(
    '../models/Finance');

/**
 * GET /finance/prediction/:date
 * @summary Returns the finance prediction for date's month
 * @tags finance
 * @param {string} date.path - The date for which the monthly prediction is requested - eg: 2024-11-25
 * @return {FinancePrediction} 200 - The finance prediction is returned - application/json
 * @return {object} 400 - Invalid date format - application/json
 */
router.get('/prediction/:date', async function (req, res) {
      const date = req.params.date;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      console.log(date);
      if (!dateRegex.test(date)) {
        return res.status(400).json(
            {error: 'Invalid date format. Please use YYYY-MM-DD.'});
      }

      const prediction = await getPrediction(date);
      console.log(prediction);
      res.status(200).json(prediction);
    }
);

/**
 * GET /finance/revenue/:days
 * @summary Returns the finance revenue for the last n days
 * @tags finance
 * @param {number} days.path - The number of days for which the revenue is requested - eg: 30
 * @return {FinanceRevenue} 200 - The finance revenue is returned - application/json
 * @return {object} 400 - Invalid days format - application/json
 */
router.get('/revenue/:days', async function (req, res) {
      const days = req.params.days;

      if (isNaN(days)) {
        return res.status(400).json(
            {error: 'Invalid days format. Please use a number.'});
      }

      const revenue = await getRevenue(days);
      res.status(200).json(revenue);
    }
);

/**
 * GET /finance/revenue/stats/:days
 * @summary Returns the finance revenue statistics for the last n days
 * @tags finance
 * @param {number} days.path - The number of days for which the revenue statistics are requested - eg: 30
 * @return {Array<RevenueStats>} 200 - The finance revenue statistics are returned - application/json
 * @return {object} 400 - Invalid days format - application/json
 */
router.get('/revenue/stats/:days', async function (req, res) {
      const days = req.params.days;

      if (isNaN(days)) {
        return res.status(400).json(
            {error: 'Invalid days format. Please use a number.'});
      }

      const revenueStats = await getRevenueStats(days);
      res.status(200).json(revenueStats);
    }
);

/**
 * GET /finance/revenue/stats/year/:year
 * @summary Returns the finance revenue statistics for a specific year
 * @tags finance
 * @param {number} year.path - The year for which the revenue statistics are requested - eg: 2024
 * @return {Array<RevenueByRoomType>} 200 - The finance revenue statistics are returned - application/json
 * @return {object} 400 - Invalid year format - application/json
 */
router.get('/revenue/stats/year/:year', async function (req, res) {
      const year = req.params.year;

      if (isNaN(year)) {
        return res.status(400).json(
            {error: 'Invalid year format. Please use a number.'});
      }

      const revenueStats = await getRevenueByRoomType(year);
      res.status(200).json(revenueStats);
    }
);

module.exports = router;