"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const BarChart = ({ data = [], title, xKey, yKey = [], colors }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const series = yKey.map((key) => ({
      type: "bar",
      xKey: xKey,
      yKey: key,
      fills: [colors[key]], // Associe chaque clé à la couleur correspondante
      strokes: [colors[key]], // Correspondance pour les contours
    }));

    setOptions({
      data,
      title: { text: title },
      series,
      legend: { position: "bottom" }, // Ajoute une légende en bas
    });
  }, [data, title, xKey, yKey, colors]);

  return <AgCharts options={options} />;
};

export default BarChart;
