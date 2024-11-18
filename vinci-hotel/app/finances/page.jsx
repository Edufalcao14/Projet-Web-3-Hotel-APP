// Finances.js
"use client";
import React, {useEffect, useState} from "react";
import ButtonFinances from "../../components/ButtonFinances";
import {BsCashCoin, BsCreditCardFill} from "react-icons/bs";
import {RiCashLine, RiMoneyEuroBoxFill} from "react-icons/ri";
import {FaChartBar} from "react-icons/fa";
import PayementBar from "../../components/PayementBar";
import {MdBedroomParent} from "react-icons/md";
import FinanceAPI from "../../services/api/finances";
import {AgCharts} from "ag-charts-react";

export default function Finances() {
    const iconCarte = <BsCreditCardFill size={35} color="#ffffff"/>;
    const iconCash = <RiCashLine size={35} color="#ffffff"/>;
    const iconTotal = <RiMoneyEuroBoxFill size={35} color="#ffffff"/>;

    const [totalRevenue, setTotalRevenue] = useState({});
    const [totalValue, setTotalValue] = useState(0);
    const [pieChartData, setPieChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [progressBarData, setProgressBarData] = useState({});

    const [nbrJours, setNbrJours] = useState(7);

    const [selectedRange, setSelectedRange] = useState("7jours");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchProgressData = async () => {
            try {
                const progressBarData = await FinanceAPI.getPrediction();
                setProgressBarData(progressBarData);
            } catch (error) {
                console.warn(error);
                setProgressBarData({});
            }
        };

        const fetchLineBarData = async () => {
            try {
                const lineChartData = await FinanceAPI.getYearStats();
                setLineChartData(lineChartData);
            } catch (error) {
                console.warn(error);
                setLineChartData([]);
            }
        };

        const fetchTypeRevenue = async () => {
            try {
                const totalRevenue = await FinanceAPI.getRevenueByType();
                setTotalValue(totalRevenue.total);
                setTotalRevenue(totalRevenue);
                setPieChartData(totalRevenue.revenue_by_payment_type);
            } catch (error) {
                console.warn(error);
                setTotalValue(0);
                setTotalRevenue({});
                setPieChartData([]);
            }
        };

        fetchLineBarData();
        fetchProgressData();
        fetchTypeRevenue();

    }, [nbrJours]);

    const showCardValue = () => setTotalValue(totalRevenue.card);
    const showCashValue = () => setTotalValue(totalRevenue.cash);
    const showTotalValue = () => setTotalValue(totalRevenue.total);

    const filterData = (range) => {
        setSelectedRange(range);
        let days;
        switch (range) {
            case "7jours":
                days = 7;
                setNbrJours(7);
                break;
            case "14jours":
                days = 14;
                setNbrJours(14);
                break;
            case "31jours":
                days = 31;
                setNbrJours(31);
                break;
            default:
                days = 7;
                setNbrJours(7);
        }

        FinanceAPI.getRevenue(days).then((data) => {
            setFilteredData(data);
        });
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
                            Total chiffre d&apos;affaires
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
                            title={"En Espèce"}
                            icon={iconCash}
                            onClick={showCashValue}
                        />
                        <ButtonFinances
                            title={"Valeur Totale"}
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
                                Revenus
                            </h2>
                        </div>

                        <select
                            value={selectedRange}
                            onChange={(e) => filterData(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="7jours">7 derniers jours</option>
                            <option value="14jours">14 derniers jours</option>
                            <option value="31jours">31 derniers jours</option>
                        </select>
                    </div>

                    <AgCharts
                        options={{
                            data: filteredData,
                            series: [
                                {
                                    type: "bar",
                                    xKey: "date",
                                    yKey: "card",
                                    fill: "#0074D9",
                                    yName: "Par carte",
                                },
                                {
                                    type: "bar",
                                    xKey: "date",
                                    yKey: "cash",
                                    fill: "#FF5733",
                                    yName: "En espèce",
                                },
                            ],
                            legend: {position: "bottom"},
                        }}
                    />
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-1">
                    <div className="flex flex-wrap">
                        <BsCashCoin className="mt-2" size={30} color="#0FA958"/>
                        <h2 className="text-2xl ml-3 font-medium text-[#5A5555]">
                            Aperçu par mode de paiement
                        </h2>
                    </div>
                    <AgCharts options={
                        {
                            data: pieChartData,
                            width: 500,
                            height: 400,
                            background: {fill: "transparent"},
                            series: [
                                {
                                    type: "pie",
                                    angleKey: "revenue",
                                    calloutLabelKey: "payment_type",
                                    sectorLabelKey: "total",
                                    fills: ["#FF5733", "#0074D9", "#2ECC40", "#001F3F", "#FFDC00"],
                                    sectorLabel: {
                                        fontWeight: "bold",
                                    },
                                },
                            ],
                        }
                    }/>
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
                    <AgCharts options={
                        {
                            data: lineChartData,
                            width: 600,
                            height: 400,
                            background: {fill: "transparent"},
                            series: [
                                {type: "line", xKey: "month", yKey: "Standard", yName: "Standard"},
                                {type: "line", xKey: "month", yKey: "Extra Comfort", yName: "Extra Comfort"},
                                {type: "line", xKey: "month", yKey: "Business", yName: "Business"},
                                {type: "line", xKey: "month", yKey: "Deluxe", yName: "Deluxe"},
                            ],
                        }
                    }/>
                </div>
            </div>
        </section>
    );
}
