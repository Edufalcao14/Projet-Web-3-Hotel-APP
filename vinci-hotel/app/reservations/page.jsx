"use client"; // Assurez-vous que cette ligne est présente en haut

import { useState } from "react";
import ChartExample from "../../components/pieChart/index.jsx";
import BarChart from "../../components/barChart/index.jsx";

// Exemple pour modifier le pieChart
export default function Reservations() {
  const pieChartData = [
    { asset: "Crypto", amount: 20000 },
    { asset: "NFTs", amount: 10000 },
  ];

  const allBarChartData = [
    { date: "04/11/2024", value: 900 },
    { date: "03/11/2024", value: 500 },
    { date: "02/11/2024", value: 700 },
    { date: "01/11/2024", value: 1200 },
    { date: "31/10/2024", value: 400 },
    { date: "30/10/2024", value: 600 },
    { date: "29/10/2024", value: 300 },
    { date: "28/10/2024", value: 900 },
    { date: "27/10/2024", value: 500 },
    { date: "26/10/2024", value: 700 },
    { date: "25/10/2024", value: 1200 },
    { date: "24/10/2024", value: 400 },
    { date: "23/10/2024", value: 600 },
    { date: "22/10/2024", value: 300 },
    { date: "21/10/2024", value: 400 },
    { date: "20/10/2024", value: 600 },
    { date: "19/10/2024", value: 300 },
    { date: "18/10/2024", value: 900 },
    { date: "17/10/2024", value: 500 },
    { date: "16/10/2024", value: 700 },
    { date: "15/10/2024", value: 1200 },
    { date: "14/10/2024", value: 400 },
    { date: "13/10/2024", value: 600 },
    { date: "12/10/2024", value: 300 },
    { date: "11/10/2024", value: 900 },
    { date: "10/10/2024", value: 500 },
    { date: "09/10/2024", value: 700 },
    { date: "08/10/2024", value: 1200 },
    { date: "07/10/2024", value: 400 },
    { date: "06/10/2024", value: 600 },
    { date: "05/10/2024", value: 300 },
    { date: "04/10/2024", value: 900 },
    { date: "03/10/2024", value: 500 },
    { date: "02/10/2024", value: 700 },
    { date: "01/10/2024", value: 1200 },
  ];

  const [dateRange, setDateRange] = useState("7jours"); // État pour la plage de dates
  const [barChartData, setBarChartData] = useState(allBarChartData); // État pour les données du bar chart

  // Fonction pour filtrer les données
  const filterData = (range) => {
    const today = new Date();
    let filteredData;

    console.log("Date actuelle :", today);

    switch (range) {
      case "7jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-")); // Format de date: YYYY-MM-DD
          console.log("Filtrage pour 7 jours, date :", date);
          return (today - date) / (1000 * 3600 * 24) <= 7;
        });
        break;
      case "14jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-"));
          console.log("Filtrage pour 14 jours, date :", date);
          return (today - date) / (1000 * 3600 * 24) <= 14;
        });
        break;
      case "31jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-"));
          console.log("Filtrage pour 31 jours, date :", date);
          return (today - date) / (1000 * 3600 * 24) <= 31;
        });
        break;
      default:
        filteredData = allBarChartData;
    }

    console.log("Données filtrées :", filteredData);
    setBarChartData(filteredData);
  };

  // Fonction de gestion de changement de sélection
  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    setDateRange(selectedRange);
    filterData(selectedRange);
  };

  return (
    <div className="-z-10">
      <ChartExample
        data={pieChartData}
        title="Digital Assets Composition"
        colors={["#FFD700", "#C0C0C0"]}
      />
      
      {/* Menu déroulant pour sélectionner la plage de dates */}
      <div className="mb-4">
        <label htmlFor="dateRange" className="mr-2">Sélectionnez une plage de dates :</label>
        <select 
          id="dateRange" 
          value={dateRange} 
          onChange={handleRangeChange} 
          className="p-2 border rounded"
        >
          <option value="7jours">Derniers 7 jours</option>
          <option value="14jours">Derniers 14 jours</option>
          <option value="31jours">Derniers 31 jours</option>
        </select>
      </div>
      
      <BarChart
        data={barChartData}
        title="Aperçu Chiffre d'affaires"
        xKey="date"
        yKey="value"
        colors={["#007bff", "#28a745", "#ffc107", "#dc3545"]}
      />
    </div>
  );
}
