"use client";

import React, {useEffect, useState} from "react";
import DonutChart from "../../components/donutChart";
import BarChart from "../../components/barChart";
import PieChart from "../../components/pieChart";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {MdInsertChart} from "react-icons/md";
import {BsCalendar2CheckFill} from "react-icons/bs";

export default function ReservationsPage() {
  const donutChartData = [
    {asset: "Check-In", amount: 31},
    {asset: "Check-Out", amount: 18},
    {asset: "In Home", amount: 56},
  ];
  const allBarChartData = [
    {
      date: "11/11/2024",
      Booking: 25,
      Expedia: 20,
      "Hotel Beds": 15,
      "Hotel Vinci": 10,
      Airbnb: 5,
    },
    {
      date: "12/11/2024",
      Booking: 30,
      Expedia: 25,
      "Hotel Beds": 20,
      "Hotel Vinci": 15,
      Airbnb: 10,
    },
    {
      date: "13/11/2024",
      Booking: 35,
      Expedia: 30,
      "Hotel Beds": 25,
      "Hotel Vinci": 20,
      Airbnb: 15,
    },
    {
      date: "14/11/2024",
      Booking: 40,
      Expedia: 35,
      "Hotel Beds": 30,
      "Hotel Vinci": 25,
      Airbnb: 20,
    },
    {
      date: "15/11/2024",
      Booking: 45,
      Expedia: 40,
      "Hotel Beds": 35,
      "Hotel Vinci": 30,
      Airbnb: 25,
    },
    {
      date: "16/11/2024",
      Booking: 50,
      Expedia: 45,
      "Hotel Beds": 40,
      "Hotel Vinci": 35,
      Airbnb: 30,
    },
    {
      date: "17/11/2024",
      Booking: 55,
      Expedia: 50,
      "Hotel Beds": 45,
      "Hotel Vinci": 40,
      Airbnb: 35,
    },
    {
      date: "18/11/2024",
      Booking: 60,
      Expedia: 55,
      "Hotel Beds": 50,
      "Hotel Vinci": 45,
      Airbnb: 40,
    },
    {
      date: "19/11/2024",
      Booking: 65,
      Expedia: 60,
      "Hotel Beds": 55,
      "Hotel Vinci": 50,
      Airbnb: 45,
    },
    {
      date: "20/11/2024",
      Booking: 70,
      Expedia: 65,
      "Hotel Beds": 60,
      "Hotel Vinci": 55,
      Airbnb: 50,
    },
    {
      date: "21/11/2024",
      Booking: 75,
      Expedia: 70,
      "Hotel Beds": 65,
      "Hotel Vinci": 60,
      Airbnb: 55,
    },
    {
      date: "22/11/2024",
      Booking: 80,
      Expedia: 75,
      "Hotel Beds": 70,
      "Hotel Vinci": 65,
      Airbnb: 60,
    },
    {
      date: "23/11/2024",
      Booking: 85,
      Expedia: 80,
      "Hotel Beds": 75,
      "Hotel Vinci": 70,
      Airbnb: 65,
    },
    {
      date: "24/11/2024",
      Booking: 90,
      Expedia: 85,
      "Hotel Beds": 80,
      "Hotel Vinci": 75,
      Airbnb: 70,
    },
    {
      date: "25/11/2024",
      Booking: 95,
      Expedia: 90,
      "Hotel Beds": 85,
      "Hotel Vinci": 80,
      Airbnb: 75,
    },
    {
      date: "26/11/2024",
      Booking: 100,
      Expedia: 95,
      "Hotel Beds": 90,
      "Hotel Vinci": 85,
      Airbnb: 80,
    },
    {
      date: "27/11/2024",
      Booking: 105,
      Expedia: 100,
      "Hotel Beds": 95,
      "Hotel Vinci": 90,
      Airbnb: 85,
    },
    {
      date: "28/11/2024",
      Booking: 110,
      Expedia: 105,
      "Hotel Beds": 100,
      "Hotel Vinci": 95,
      Airbnb: 90,
    },
    {
      date: "29/11/2024",
      Booking: 115,
      Expedia: 110,
      "Hotel Beds": 105,
      "Hotel Vinci": 100,
      Airbnb: 95,
    },
    {
      date: "30/11/2024",
      Booking: 120,
      Expedia: 115,
      "Hotel Beds": 110,
      "Hotel Vinci": 105,
      Airbnb: 100,
    },
  ];

  const pieChartData = [
    {asset: "Booking", amount: 256},
    {asset: "Expedia", amount: 198},
    {asset: "Hotel Beds", amount: 154},
    {asset: "Hotel Vinci", amount: 110},
    {asset: "Airbnb", amount: 76},
  ];

  const rowData = [
    {
      id: 1,
      guest: "Jean Dupont",
      checkIn: "2024-11-04",
      checkOut: "2024-11-10",
      room: "101",
      status: "Confirmed",
    },
    {
      id: 2,
      guest: "Marie Curie",
      checkIn: "2024-11-03",
      checkOut: "2024-11-08",
      room: "102",
      status: "Pending",
    },
    {
      id: 3,
      guest: "Pierre Curie",
      checkIn: "2024-11-05",
      checkOut: "2024-11-09",
      room: "103",
      status: "Confirmed",
    },
    {
      id: 4,
      guest: "Albert Einstein",
      checkIn: "2024-11-06",
      checkOut: "2024-11-11",
      room: "104",
      status: "Pending",
    },
    {
      id: 5,
      guest: "Isaac Newton",
      checkIn: "2024-11-07",
      checkOut: "2024-11-12",
      room: "105",
      status: "Confirmed",
    },
    {
      id: 6,
      guest: "Galileo Galilei",
      checkIn: "2024-11-08",
      checkOut: "2024-11-13",
      room: "106",
      status: "Confirmed",
    },
    {
      id: 7,
      guest: "Nikola Tesla",
      checkIn: "2024-11-09",
      checkOut: "2024-11-14",
      room: "107",
      status: "Pending",
    },
    {
      id: 8,
      guest: "Thomas Edison",
      checkIn: "2024-11-10",
      checkOut: "2024-11-15",
      room: "108",
      status: "Confirmed",
    },
    {
      id: 9,
      guest: "Alexander Graham Bell",
      checkIn: "2024-11-11",
      checkOut: "2024-11-16",
      room: "109",
      status: "Confirmed",
    },
    {
      id: 10,
      guest: "James Watt",
      checkIn: "2024-11-12",
      checkOut: "2024-11-17",
      room: "110",
      status: "Pending",
    },
    {
      id: 11,
      guest: "Michael Faraday",
      checkIn: "2024-11-13",
      checkOut: "2024-11-18",
      room: "111",
      status: "Confirmed",
    },
    {
      id: 12,
      guest: "Max Planck",
      checkIn: "2024-11-14",
      checkOut: "2024-11-19",
      room: "112",
      status: "Confirmed",
    },
    {
      id: 13,
      guest: "Erwin Schrödinger",
      checkIn: "2024-11-15",
      checkOut: "2024-11-20",
      room: "113",
      status: "Pending",
    },
    {
      id: 14,
      guest: "Werner Heisenberg",
      checkIn: "2024-11-16",
      checkOut: "2024-11-21",
      room: "114",
      status: "Confirmed",
    },
    {
      id: 15,
      guest: "Richard Feynman",
      checkIn: "2024-11-17",
      checkOut: "2024-11-22",
      room: "115",
      status: "Confirmed",
    },
  ];

  const columnDefs = [
    {headerName: "Guest", field: "guest", sortable: true, filter: true},
    {
      headerName: "Check-In Date",
      field: "checkIn",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Check-Out Date",
      field: "checkOut",
      sortable: true,
      filter: true,
    },
    {headerName: "Room", field: "room", sortable: true, filter: true},
    {headerName: "Status", field: "status", sortable: true, filter: true},
  ];

  const colors = ["#044879", "#f7b200", "#2ebbce", "#025864", "#cb584e"];

  const [barChartData, setBarChartData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("7jours");

  useEffect(() => {
    filterData("7jours");
  }, []);

  const filterData = (range) => {
    const today = new Date();
    let filteredData;

    switch (range) {
      case "7jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-"));
          return (date - today) / (1000 * 3600 * 24) <= 7 && date >= today;
        });
        break;
      case "14jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-"));
          return (date - today) / (1000 * 3600 * 24) <= 14 && date >= today;
        });
        break;
      case "31jours":
        filteredData = allBarChartData.filter((data) => {
          const date = new Date(data.date.split("/").reverse().join("-"));
          return (date - today) / (1000 * 3600 * 24) <= 31 && date >= today;
        });
        break;
      default:
        filteredData = allBarChartData;
    }

    setBarChartData(filteredData);
    setSelectedRange(range);
  };

  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-grow p-4 md:p-8 bg-gray-100 overflow-y-auto">
          <div className="">
            <h1 className="text-3xl text-left mb-8 text-[#5A5555]">
              Tableau de Bord - Réservations{" "}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 ">
            <div
                className="bg-white p-6 shadow-lg rounded-lg bg-lighBackground-image bg-no-repeat bg-cover ">
              <h2 className="text-xl text-white font-sans font-medium mb-4">
                Réservations
              </h2>
              <DonutChart
                  data={donutChartData}
                  title="Réservations"
                  colors={colors}
                  textColor={"#ffffff"}
              />
            </div>

            <div
                className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-wrap">
                  <MdInsertChart size={45} color="#025864"/>
                  <h2 className="text-2xl mt-1 ml-3 font-medium text-[#5A5555]">
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
                  title="Prévisions de Réservations"
                  xKey="date"
                  yKey={[
                    "Booking",
                    "Expedia",
                    "Hotel Beds",
                    "Hotel Vinci",
                    "Airbnb",
                  ]}
                  colors={colors}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <div
                className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-medium mb-4 text-[#5A5555]">
                Liste des Réservations
              </h2>
              <div
                  className="ag-theme-alpine"
                  style={{height: 300, width: "100%"}}
              >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                />
            </div>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <div className="flex flex-wrap">
                <BsCalendar2CheckFill size={30} color="#025864"/>
                <h2 className="text-2xl ml-3 font-medium text-[#5A5555] mb-4">
                  Répartition des Statuts
                </h2>
              </div>

              <PieChart
                  data={pieChartData}
                  title="Statuts des Réservations"
                  colors={colors}
                  width={400}
                  height={300}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
