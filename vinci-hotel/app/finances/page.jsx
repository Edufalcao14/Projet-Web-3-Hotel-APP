// Finances.js
"use client";
import React, {useEffect, useState} from "react";
import ButtonFinances from "../../components/ButtonFinances";
import {BsCashCoin, BsCreditCardFill} from "react-icons/bs";
import {RiCashLine, RiMoneyEuroBoxFill} from "react-icons/ri";
import PieChart from "../../components/pieChart";
import BarChart from "../../components/barChart";
import {FaChartBar} from "react-icons/fa";
import PayementBar from "../../components/PayementBar";
import LineChart from "../../components/LineChart";
import {MdBedroomParent} from "react-icons/md";
import FinanceAPI from "../../services/api/finances";

export default function Finances() {
  const iconCarte = <BsCreditCardFill size={35} color="#ffffff"/>;
  const iconCash = <RiCashLine size={35} color="#ffffff"/>;
  const iconTotal = <RiMoneyEuroBoxFill size={35} color="#ffffff"/>;

const [barChartData, setBarChartData] = useState([]);
const [pieChartData, setPieChartData] = useState([]);
const [lineChartData, setLineChartData] = useState([]);
const [progressBarData , setProgressBarData] = useState([]);
const [totalRevenue , setTotalRevenue] = useState([]);
const [nbrJours , setNbrJoursDefault] = useState(7); 
const [loading, setLoading] = useState(true);
const [totalValue, setTotalValue] = useState(0);
const [selectedRange, setSelectedRange] = useState("7jours");
const [filteredData, setFilteredData] = useState([]);

useEffect(() => {
  const fetchProgressData = async () => {
    setLoading(true);
    try {
      const progressBarData = await FinanceAPI.getProgressBarData();
      setProgressBarData(progressBarData);
    } catch (error) {
      console.warn(error);
      setProgressBarData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPieChartData = async () => {
    setLoading(true);
    try {
      const pieChartData = await FinanceAPI.getPieChartData();
      setPieChartData(pieChartData);
      console.log("PieChartData", pieChartData);
    } catch (error) {
      console.warn(error);
      setPieChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLineBarData = async () => {
    setLoading(true);
    try {
      const lineChartData = await FinanceAPI.getLineChartData();
      setLineChartData(lineChartData);
    } catch (error) {
      console.warn(error);
      setLineChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBarChartData = async (nbrJours) => {
    setLoading(true);
    try {
      const barChartData = await FinanceAPI.getBarChartData(nbrJours);
      setBarChartData(barChartData);
    } catch (error) {
      console.warn(error);
      setBarChartData([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchTotalRevenue = async () => {
    setLoading(true);
    try {
      const totalRevenue = await FinanceAPI.getTotalRevenue();
      setTotalRevenue(totalRevenue);
      setTotalValue(totalRevenue.total);
    } catch (error) {
      console.warn(error);
      setTotalRevenue([]);
    } finally {
     
      setLoading(false);
    }
  };

  fetchLineBarData();
  fetchBarChartData(nbrJours);
  fetchPieChartData();  
  fetchProgressData();
  fetchTotalRevenue();

} , [nbrJours]); 

  const showCardValue = () => setTotalValue(totalRevenue.card);
  const showCashValue = () => setTotalValue(totalRevenue.cash);
  const showTotalValue = () => setTotalValue(totalRevenue.total);
  const colors = ["#fcbb31", "#cb584e", "#cb584e", "#145381"];

  const filterData = (range) => {
    setSelectedRange(range);
    let days;
    switch (range) {
      case "7jours":
        days = 7;
        setNbrJoursDefault(7);
        break;
      case "14jours":
        days = 14;
        setNbrJoursDefault(14);
        break;
      case "31jours":
        days = 31;
        setNbrJoursDefault(31);
        break;
      default:
        days = 7;
        setNbrJoursDefault(7);
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mx-4 my-3 rounded-lg shadow-lg">
          <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2">
            {" "}
            {/* BarChart takes 2/3 on medium screens and above */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap">
                <FaChartBar className="mx-1" size={30} color="#0FA958"/>
                <h2 className="text-2xl ml-3 font-medium text-[#5A5555]">
                  Prévisions des Réservations
                </h2>
              </div>

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
                data={barChartData}
                title=""
                xKey="date"
                yKey={["card", "cash"]}
                colors={["#044879", "#66bb6a"]}
            />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-1">
            <div className="flex flex-wrap">
              <BsCashCoin className="mt-2" size={30} color="#0FA958"/>
              <h2 className="text-2xl ml-3 font-medium text-[#5A5555]">
                Aperçu Mode de paiement
              </h2>
            </div>
            <PieChart
                data={pieChartData}
                title=""
                width={500}
                height={400}
                colors={["#cb584e", "#044879", "#0FA958", "#f9ad20"]}
            />
          </div>
        </div>

        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-4 my-6">
          {/* Primeira coluna: Barra de pagamento */}
          <div
              className="col-span-1 sm:col-span-2 lg:col-span-1 p-4 bg-white shadow-lg rounded-lg">
            <PayementBar totalValue={progressBarData.prediction} paidValue={progressBarData.paid}/>
          </div>

          {/* Segunda coluna: Gráfico */}
          <div
              className="col-span-1 sm:col-span-2 lg:col-span-2 p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-wrap items-center">
              <MdBedroomParent size={35} color="#0FA958"/>
              <h1 className="text-xl sm:text-2xl ml-3 font-medium text-[#5A5555]">
                Chiffre d&rsquo;affaires par type de chambre
              </h1>
            </div>
            <LineChart
                data={lineChartData}
                title=""
                xKey="Mois"
                yKey={["Standard", "Double", "Luxe", "Bussines"]}
                colors={colors}
            />
          </div>
        </div>
      </section>
  );
}
