"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const PieChart = ({ data, title, colors, width = 600, height = 400 }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      data,
      title: { text: title },
      width: width, 
      height: height,
      background: { fill: "transparent" }, 
      series: [
        {
          type: "pie",
          angleKey: "amount",
          calloutLabelKey: "asset",
          sectorLabelKey: "amount",
          fills: colors,
          sectorLabel: {
            fontWeight: "bold",
            formatter: ({ value }) => `${value} réservations`,
          },
        },
      ],
    });
  }, [data, title, colors, width, height]); // Include width and height here

  return <AgCharts options={options} />;
};

export default PieChart;
