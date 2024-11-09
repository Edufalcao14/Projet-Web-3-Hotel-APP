"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const PieChart = ({ data, title, colors }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      data,
      title: { text: title },
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
  }, [data, title, colors]);

  return <AgCharts options={options} />;
};

export default PieChart;
