"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const BarChart = ({
  data,
  title,
  xKey,
  yKey,
  colors,
}) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      data,
      title: { text: title },
      series: [
        {
          type: "bar",
          xKey,
          yKey,
          fills: colors,
          label: {
            enabled: true,
            formatter: ({ value }) => `${value}`,
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: { text: "Date" },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Valeur" },
        },
      ],
    });
  }, [data, title, xKey, yKey, colors]);

  return <AgCharts options={options} />;
};

export default BarChart;
