"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const PieChart = ({
  data = [
    { asset: "Stocks", amount: 60000 },
    { asset: "Bonds", amount: 40000 },
    { asset: "Cash", amount: 7000 },
    { asset: "Real Estate", amount: 5000 },
    { asset: "Commodities", amount: 3000 },
  ],
  title = "Portfolio Composition",
  colors = ["#5C6BC0", "#42A5F5", "#66BB6A", "#FFA726", "#FF7043"],
}) => {
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
            color: "white",
            fontWeight: "bold",
            formatter: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
          },
        },
      ],
    });
  }, [data, title, colors]);

  return <AgCharts options={options} />;
};

export default PieChart;