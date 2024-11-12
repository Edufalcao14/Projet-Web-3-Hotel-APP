"use client"
import DonutChart from "../../components/donutChart/index.jsx"; // Assurez-vous que le nom du fichier est correct

export default function Rooms() {
  const donutChartData = [
    {asset: "Stocks", amount: 60000},
    {asset: "Bonds", amount: 40000},
    {asset: "Cash", amount: 7000},
    {asset: "Real Estate", amount: 5000},
    {asset: "Commodities", amount: 3000},
  ];

  return (
      <div>
        <h1>Rooms</h1>
        <DonutChart data={donutChartData} title="Portfolio Distribution"
                    colors={["#98D2EB", "#77625C", "#c1121f", "#606c38"]}/>
      </div>
  );
}
