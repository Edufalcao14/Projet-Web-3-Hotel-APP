// Finances.js
"use client";
import React, {useEffect, useState} from "react";
import ButtonFinances from "../../components/ButtonFinances";
import {BsCreditCardFill} from "react-icons/bs";
import {RiCashLine, RiMoneyEuroBoxFill} from "react-icons/ri";
import PieChart from "../../components/pieChart";
import BarChart from "../../components/barChart";

export default function Finances() {
  const iconCarte = <BsCreditCardFill size={35} color="#ffffff"/>;
  const iconCash = <RiCashLine size={35} color="#ffffff"/>;
  const iconTotal = <RiMoneyEuroBoxFill size={35} color="#ffffff"/>;

  const cardValue = 22473.9;
  const cashValue = 10837.83;
  const totalInitialValue = cardValue + cashValue;

  const [totalValue, setTotalValue] = useState(totalInitialValue);
  const [selectedRange, setSelectedRange] = useState("7jours");
  const [filteredData, setFilteredData] = useState([]);

  const showCardValue = () => setTotalValue(cardValue);
  const showCashValue = () => setTotalValue(cashValue);
  const showTotalValue = () => setTotalValue(totalInitialValue);

  const barChartData = [
    {date: "14/10/2024", cash: 200, card: 500},
    {date: "15/10/2024", cash: 400, card: 800},
    {date: "16/10/2024", cash: 600, card: 900},
    {date: "17/10/2024", cash: 300, card: 1000},
    {date: "18/10/2024", cash: 500, card: 700},
    {date: "19/10/2024", cash: 400, card: 850},
    {date: "20/10/2024", cash: 550, card: 950},
    {date: "21/10/2024", cash: 650, card: 900},
    {date: "22/10/2024", cash: 500, card: 1000},
    {date: "23/10/2024", cash: 300, card: 700},
    {date: "24/10/2024", cash: 550, card: 950},
    {date: "25/10/2024", cash: 450, card: 850},
    {date: "26/10/2024", cash: 400, card: 750},
    {date: "27/10/2024", cash: 600, card: 920},
    {date: "28/10/2024", cash: 550, card: 980},
    {date: "29/10/2024", cash: 500, card: 1000},
    {date: "30/10/2024", cash: 480, card: 870},
    {date: "31/10/2024", cash: 520, card: 920},
    {date: "01/11/2024", cash: 400, card: 850},
    {date: "02/11/2024", cash: 450, card: 890},
    {date: "03/11/2024", cash: 300, card: 920},
    {date: "04/11/2024", cash: 600, card: 1000},
    {date: "05/11/2024", cash: 700, card: 950},
    {date: "06/11/2024", cash: 500, card: 850},
    {date: "07/11/2024", cash: 620, card: 980},
    {date: "08/11/2024", cash: 550, card: 1000},
    {date: "09/11/2024", cash: 600, card: 930},
    {date: "10/11/2024", cash: 480, card: 890},
    {date: "11/11/2024", cash: 500, card: 910},
    {date: "12/11/2024", cash: 430, card: 870},
    {date: "13/11/2024", cash: 650, card: 940},
    {date: "14/11/2024", cash: 700, card: 1000},
    {date: "15/11/2024", cash: 600, card: 920},
  ];

  const pieChartData = [
    {asset: "MasterCard", amount: 60000},
    {asset: "Visa", amount: 40000},
    {asset: "Cash", amount: 5000},
    {asset: "AmericanExpress", amount: 10000},
  ];
  const filterData = (range) => {
    setSelectedRange(range);
    let days;
    switch (range) {
      case "7jours":
        days = 7;
        break;
      case "14jours":
        days = 14;
        break;
      case "31jours":
        days = 31;
        break;
      default:
        days = 7;
    }

    const filtered = barChartData.slice(-days);
    setFilteredData(filtered);
  };

  // Initial filter on component mount
  useEffect(() => {
    filterData(selectedRange);
  }, [selectedRange]);

  return (
      <section className="w-full flex flex-col bg-gray-100">
        <div
            className="h-full pt-3 pb-3 sm:pt-6 sm:pb-6 border-b-2 sm:text-center">
          <h1 className="text-gray-800 text-2xl md:text-3xl mx-5 text-center lg:text-left">
            Tableau de Bord - Finances
          </h1>
        </div>

        <div
            className="bg-lighBackground-image bg-cover bg-no-repeat mx-4 sm:mx-6 my-3 rounded-2xl p-4 sm:p-8">
          <div
              className="flex flex-wrap justify-center items-center mx-4 sm:mx-8 my-2">
            <div className="flex flex-col py-5">
              <p className="text-white text-base md:text-lg">
                Total Chiffre d&apos;affaires
              </p>
              <h1 className="text-4xl md:text-5xl text-white py-2 md:py-3">
                {totalValue}€
              </h1>
            </div>
            <div
                className="flex flex-col md:flex-row w-full md:w-3/4 items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <ButtonFinances
                  title={"Par Carte"}
                  icon={iconCarte}
                  onClick={showCardValue}
              />
              <ButtonFinances
                  title={"En Spèce"}
                  icon={iconCash}
                  onClick={showCashValue}
              />
              <ButtonFinances
                  title={"Valeur Total"}
                  icon={iconTotal}
                  onClick={showTotalValue}
              />
            </div>
          </div>
        </div>
        {/* Display bar chart and pie chart side by side */}
        <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mx-4 my-6 rounded-lg shadow-lg">
          <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2">
            {" "}
            {/* BarChart takes 2/3 on medium screens and above */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-[#5A5555]">
                Prévisions des Réservations
              </h2>
              <select
                  value={selectedRange}
                  onChange={(e) => filterData(e.target.value)}
                  className="p-2 border rounded"
              >
                <option value="7jours">7 prochains jours</option>
                <option value="14jours">14 prochains jours</option>
                <option value="31jours">31 prochains jours</option>
              </select>
            </div>
            <BarChart
                data={filteredData}
                title="Prévisions de Réservations"
                xKey="date"
                yKey={["card", "cash"]}
                colors={["#a5d6a7", "#66bb6a"]}
            />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-1">
            {" "}
            {/* PieChart takes 1/3 on medium screens and above */}
            <PieChart
                data={pieChartData}
                title="Aperçu Mode de paiement"
                width={500}
                height={400}
                colors={["#cb584e", "#044879", "#ffee58", "#f9ad20"]}
            />
          </div>
        </div>

        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-4 my-6 rounded-lg shadow-lg"></div>
      </section>
  );
}
