"use client";

import React from "react";
import DonutChart from "../../components/donutChart";
import {AgCharts} from "ag-charts-react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function ServicesPage() {
  const donutChartData = [
    {asset: "Petit Déjeuner", amount: 100},
    {asset: "Jacuzzi", amount: 110},
    {asset: "Massage", amount: 90},
  ];

  //graphique area series
  const allBarChartData = [
    {date: "Q1", Déjeuner: 20, Jacuzzi: 20, Massage: 30},
    {date: "Q2", Déjeuner: 35, Jacuzzi: 25, Massage: 15},
    {date: "Q3", Déjeuner: 20, Jacuzzi: 30, Massage: 20},
    {date: "Q4", Déjeuner: 25, Jacuzzi: 35, Massage: 25},
  ];

  //options graphique area series
  const series = [
    {
      type: "area",
      xKey: "date",
      yKey: "Déjeuner",
      yName: "Petit Déjeuner",
      stroke: "#6A1B9A",
      strokeWidth: 3,
      lineDash: [3, 4],
      fill: "#AB47BC",
      fillOpacity: 0.6,
    },
    {
      type: "area",
      xKey: "date",
      yKey: "Jacuzzi",
      yName: "Jacuzzi",
      stroke: "#1565C0",
      strokeWidth: 3,
      lineDash: [3, 4],
      fill: "#42A5F5",
      fillOpacity: 0.6,
    },
    {
      type: "area",
      xKey: "date",
      yKey: "Massage",
      yName: "Massage",
      stroke: "#2E7D32",
      strokeWidth: 3,
      lineDash: [3, 4],
      fill: "#66BB6A",
      fillOpacity: 0.6,
    },
  ];

  const options = {
    title: {
      text: "Ventes des Services",
    },
    data: allBarChartData,
    series: series,
  };
  //tableau
  const rowData = [
    {
      service: "Jacuzzi",
      prenom: "Omar",
      nom: "Koubaï",
      email: "omar.koubai@gx.com",
      telephone: "123456789",
      chambre: "32"
    },
    {
      service: "Petit Déjeuner",
      prenom: "Sarah",
      nom: "Bourdin",
      email: "sarah.bourdin@domain.com",
      telephone: "987654321",
      chambre: "12"
    },
    {
      service: "Massage",
      prenom: "Léo",
      nom: "Martin",
      email: "leo.martin@domain.com",
      telephone: "564738291",
      chambre: "45"
    },
    {
      service: "Jacuzzi",
      prenom: "Camille",
      nom: "Dupont",
      email: "camille.dupont@domain.com",
      telephone: "129483756",
      chambre: "18"
    },
    {
      service: "Petit Déjeuner",
      prenom: "Lucas",
      nom: "Moreau",
      email: "lucas.moreau@domain.com",
      telephone: "876543210",
      chambre: "27"
    },
    {
      service: "Massage",
      prenom: "Emma",
      nom: "Dubois",
      email: "emma.dubois@domain.com",
      telephone: "345678912",
      chambre: "22"
    },
    {
      service: "Jacuzzi",
      prenom: "Nina",
      nom: "Garcia",
      email: "nina.garcia@domain.com",
      telephone: "123789456",
      chambre: "14"
    },
    {
      service: "Petit Déjeuner",
      prenom: "Maxime",
      nom: "Dumont",
      email: "maxime.dumont@domain.com",
      telephone: "567123890",
      chambre: "31"
    },
    {
      service: "Massage",
      prenom: "Aline",
      nom: "Leclerc",
      email: "aline.leclerc@domain.com",
      telephone: "456789123",
      chambre: "37"
    },
    {
      service: "Jacuzzi",
      prenom: "Yann",
      nom: "Roux",
      email: "yann.roux@domain.com",
      telephone: "789456123",
      chambre: "40"
    },
    {
      service: "Petit Déjeuner",
      prenom: "Léa",
      nom: "Fournier",
      email: "lea.fournier@domain.com",
      telephone: "678912345",
      chambre: "16"
    },
    {
      service: "Massage",
      prenom: "Paul",
      nom: "Renard",
      email: "paul.renard@domain.com",
      telephone: "234567890",
      chambre: "29"
    }
  ];

  //nom colones tableau
  const columnDefs = [
    {headerName: "Service", field: "service", sortable: true, filter: true},
    {headerName: "Prénom", field: "prenom", sortable: true, filter: true},
    {headerName: "Nom", field: "nom", sortable: true, filter: true},
    {headerName: "Email", field: "email", sortable: true, filter: true},
    {headerName: "Téléphone", field: "telephone", sortable: true, filter: true},
    {headerName: "N° Chambre", field: "chambre", sortable: true, filter: true},
  ];

  const colors = ["#44bba4", "#f76c5e", "#f2c14e"];

  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-grow p-4 md:p-8 bg-gray-100 overflow-y-auto">
          <h1 className="text-3xl text-left mb-8 text-[#5A5555]">Tableau de Bord
            - Services Supplémentaires</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-medium text-[#5A5555] mb-4">Ventes des
                Services par Année (2023)</h2>
              <DonutChart data={donutChartData} title="Ventes des Services"
                          colors={colors}/>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-medium text-[#5A5555] mb-4">Ventes des
                Services par Quadrimestre (2023)</h2>
                <AgCharts options={options}/>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-medium text-[#5A5555] mb-4">Liste des
              Services Supplémentaires</h2>
            <div className="ag-theme-alpine"
                 style={{height: 300, width: "100%"}}>
              <AgGridReact rowData={rowData} columnDefs={columnDefs}
                           pagination={true}/>
            </div>
          </div>
        </div>
      </div>
  );
}