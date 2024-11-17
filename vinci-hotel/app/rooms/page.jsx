"use client";

import React, {useEffect, useState} from "react";
import DonutChart from "../../components/donutChart";
import PieChart from "../../components/pieChart";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import RoomsAPI from "../../services/api/rooms";

export default function RoomsPage() {
  const availabilityColors = ["#1e4620", "#f7b200", "#cb584e"];
  const colors = ["#044879", "#f7b200", "#2ebbce", "#025864", "#cb584e"];
  const today = new Date().toISOString().split("T")[0];

  const [rooms, setRooms] = useState([]);
  const [occupancyRate, setOccupancyRate] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [pickedDate, setPickedDate] = useState(today);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let availableRooms = [];
    let reservedRooms = [];
    let occupiedRooms = [];

    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsData = await RoomsAPI.getStats(pickedDate);

        if (statsData.statuses_stats) {
          const occupancyRateData = statsData.statuses_stats.map((stat) => ({
            asset: stat.current_status,
            amount: parseInt(stat.count, 10),
          }));
          setOccupancyRate(occupancyRateData);

          const availableRoomsData = statsData.types_stats.map((stat) => ({
            asset: stat.type,
            amount: parseInt(stat.count, 10),
          }));
          setAvailableRooms(availableRoomsData);
        } else if (statsData.rooms) {
          const occupancyRateData = [
            {asset: "Available", amount: statsData.totalAvailableRooms},
            {asset: "Reserved", amount: statsData.totalReservedRooms},
            {asset: "Occupied", amount: statsData.totalOccupiedRooms},
          ];
          setOccupancyRate(occupancyRateData);

          const availableRoomsData = statsData.types_stats.map((stat) => ({
            asset: stat.type,
            amount: parseInt(stat.count, 10),
          }));
          setAvailableRooms(availableRoomsData);

          availableRooms = statsData.rooms.available;
          for (let room of availableRooms) {
            room.current_status = "Available";
          }
          reservedRooms = statsData.rooms.reserved;
          for (let room of reservedRooms) {
            room.current_status = "Reserved";
          }
          occupiedRooms = statsData.rooms.occupied;
          for (let room of occupiedRooms) {
            room.current_status = "Occupied";
          }

          setRooms([...availableRooms, ...reservedRooms, ...occupiedRooms]);
        } else {
          console.warn("Unexpected response format:", statsData);
          setOccupancyRate([]);
          setAvailableRooms([]);
        }
      } catch (error) {
        console.warn(error);
        setOccupancyRate([]);
        setAvailableRooms([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchRooms = async () => {
      setLoading(true);

      try {
        const roomsData = await RoomsAPI.getAll();
        setRooms(roomsData);
      } catch (error) {
        console.warn(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    if (pickedDate === today) {
      fetchRooms();
    }
    fetchStats();
  }, [pickedDate]);

  const columnDefs = [
    {headerName: "Nom", field: "name", sortable: true, filter: true, flex: 1},
    {
      headerName: "Étage",
      field: "floor",
      sortable: true,
      filter: true,
      flex: 0.25
    },
    {
      headerName: "Numéro",
      field: "number",
      sortable: true,
      filter: true,
      flex: 0.30
    },
    {headerName: "Type", field: "type", sortable: true, filter: true, flex: 1},
    {
      headerName: "Type de lit",
      field: "bed_type",
      sortable: true,
      filter: true, flex: 1
    },
    {
      headerName: pickedDate === today ? "Statut actuel" : "Statut",
      field: "current_status",
      sortable: true,
      filter: true, flex: 1
    },
  ];

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value).toISOString().split("T")[0];
    setPickedDate(newDate);
  };

  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-grow p-4 md:p-8 bg-gray-100 overflow-y-auto">
          <div>
            <h1 className="text-3xl text-left mb-8 text-[#5A5555]">Tableau de
              Bord - Chambres</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <div
                className="bg-white p-6 shadow-lg rounded-lg bg-lighBackground-image bg-no-repeat bg-cover">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-white font-sans font-medium">Taux
                  d'occupation</h2>
              </div>
              {loading ? (
                  <div className="text-center text-white">Chargement...</div>
              ) : occupancyRate.length > 0 ? (
                  <>
                    <DonutChart data={occupancyRate}
                                title={`Date: ${pickedDate}`}
                                colors={availabilityColors}
                                textColor={"#ffffff"}/>
                    <div className="flex justify-center items-center mt-6">
                      <input
                          type="date"
                          value={pickedDate}
                          onChange={handleDateChange}
                          className="p-2 border rounded bg-white text-black"
                          aria-label="Sélectionner la date"
                      />
                    </div>
                  </>
              ) : (
                  <div className="text-center text-white">Pas de données
                    disponibles</div>
              )}
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-medium text-[#5A5555] mb-4">Chambres
                disponibles</h2>
              {loading ? (
                  <div
                      className="text-center text-[#5A5555]">Chargement...</div>
              ) : availableRooms.length > 0 ? (
                  <div className="flex justify-center items-center">
                    <PieChart data={availableRooms}
                              title={`Date: ${pickedDate}`}
                              colors={colors}/>
                  </div>
              ) : (
                  <div className="text-center text-[#5A5555]">Pas de données
                    disponibles</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div
                className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-medium mb-4 text-[#5A5555]">Liste des
                chambres</h2>
              <div className="ag-theme-alpine"
                   style={{height: 300, width: "100%"}}>
                {loading ? (
                    <div className="text-center">Loading data...</div>
                ) : (
                    <AgGridReact
                        rowData={rooms}
                        columnDefs={columnDefs}
                        pagination={false}
                        overlayNoRowsTemplate={"Pas de données disponibles"}
                    />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
