import axios from "axios";
import { financeUrl } from "./routes";
const formatData = (data) => {
  // Créer un tableau pour chaque mois
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

  // Initialise un tableau vide pour stocker les données formatées
  const LineChartData = months.map((month) => {
    const entry = {
      Mois: month,
    };

    // Remplir les données pour chaque type de chambre
    data.forEach((room) => {
      // Chercher la donnée du revenu du mois correspondant
      const monthData = room.monthly_revenue.find((m) => m.month === month);
      if (monthData) {
        // Ajouter les revenus au mois
        entry[room.room_type] = monthData.revenue;
      } else {
        // Si aucune donnée n'est trouvée, ajouter 0
        entry[room.room_type] = 0;
      }
    });

    return entry;
  });
  return LineChartData;
};

const today = new Date().toISOString().split("T")[0];

const getProgressBarData = () =>
  axios
    .get(`${financeUrl}/prediction/${today}`)
    .then((response) => response.data);
const getBarChartData = (nbrDays) =>
  axios.get(`${financeUrl}/revenue/${nbrDays}`).then((response) => {
    const data = response.data;

    const startDate = new Date();
    const dates = [];
    for (let i = 0; i < nbrDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - i);
      dates.push(date.toLocaleDateString("fr-FR"));
    }

    const totalCardRevenue = data.revenue_by_card.revenue;
    const totalCashRevenue = data.revenue_by_cash.revenue;

    const dailyCashRevenue = totalCashRevenue / nbrDays;
    const dailyCardRevenue = totalCardRevenue / nbrDays;

    const barChartData = dates.map((date, index) => ({
      date: date,
      cash: dailyCashRevenue,
      card: dailyCardRevenue,
    }));
    return barChartData;
  });

const getPieChartData = () =>
  axios.get(`${financeUrl}/revenue/30`).then((response) => response.data);

const getLineChartData = () => {
  axios.get(`${financeUrl}/revenue/stats/year/2024`).then((response) => {
    const data = response.data; // les données reçues de l'API
    const formattedData = formatData(data);
    return formattedData;
  });
};

const getTotalRevenue = () =>
  axios.get(`${financeUrl}/revenue/30`).then((response) => {
    const data = response.data;

    const totalCardRevenue = data.revenue_by_card.revenue;
    const totalCashRevenue = data.revenue_by_cash.revenue;

    const totalvalue = {
      cash: totalCashRevenue,
      card: totalCardRevenue,
      total: totalCardRevenue + totalCashRevenue,
    };

    return totalvalue;
  });

const FinancesAPI = {
  getProgressBarData,
  getBarChartData,
  getPieChartData,
  getLineChartData,
  getTotalRevenue,
};

export default FinancesAPI;
