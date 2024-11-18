import axios from "axios";
import {financeUrl} from "./routes";

const today = new Date().toISOString().split("T")[0];

const getPrediction = () =>
    axios
        .get(`${financeUrl}/prediction/${today}`)
        .then((response) => response.data);

const getRevenue = (nbrDays) =>
    axios.get(`${financeUrl}/revenue/stats/${nbrDays}`).then((response) => {
        const data = response.data;

        return data.map((row) => ({
            date: row.date.split("T")[0],
            card: row.card_revenue,
            cash: row.cash_revenue,
        }));
    });

const getYearStats = () => {
    const year = today.split("-")[0];
    return axios.get(`${financeUrl}/revenue/stats/year/${year}`).then((response) => {
        function transformDataWithGaps(rawData) {
            const months = [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre",
            ];

            return months.map((month) => {
                const entry = {month};

                rawData.forEach((room) => {
                    const roomData = room.monthly_revenue.find((data) => data.month === month);
                    // Si la valeur est 0 ou absente, on insère `undefined` pour créer un gap
                    entry[room.room_type] = roomData && roomData.revenue !== 0 ? roomData.revenue : undefined;
                });

                return entry;
            });
        }

        const data = response.data;
        return transformDataWithGaps(data);
    });
};

const getRevenueByType = () =>
    axios.get(`${financeUrl}/revenue/30`).then((response) => {
        const data = response.data;

        const totalCardRevenue = data.revenue_by_card.revenue;
        const totalCashRevenue = data.revenue_by_cash.revenue;
        const totalRevenue = data.revenue;
        const revenueByPaymentType = data.revenue_by_payment_type;

        return {
            cash: totalCashRevenue,
            card: totalCardRevenue,
            total: totalRevenue,
            revenue_by_payment_type: revenueByPaymentType,
        };
    });

const FinancesAPI = {
    getPrediction,
    getRevenue,
    getYearStats,
    getRevenueByType,
};

export default FinancesAPI;
