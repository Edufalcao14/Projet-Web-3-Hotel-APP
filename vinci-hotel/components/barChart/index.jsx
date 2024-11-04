"use client";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const BarChart = ({
  data = [],
  title,
  xKey,
  yKey = [],
  colors,
}) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const series = yKey.map((key, index) => ({
      type: "bar",
      xKey,
      yKey: key,
      fills: colors[index],
    }));

    setOptions({
      data,
      title: { text: title },
      series,
    });
  }, [data, title, xKey, yKey, colors]);

  return <AgCharts options={options} />;
};

export default BarChart;
