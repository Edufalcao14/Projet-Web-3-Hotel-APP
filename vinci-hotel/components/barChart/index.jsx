"use client";

import React, {useEffect, useState} from "react";
import {AgCharts} from "ag-charts-react";

const BarChart = ({data = [], title, xKey, yKey = [], colors}) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const series = yKey.map((key, index) => ({
      type: "bar",
      xKey: xKey,
      yKey: key,
      fill: colors[index],
    }));
    setOptions({
      data,
      title: {text: title},
      series,
      legend: {position: "bottom"}, // Ajoute une légende en bas
    });
  }, [data, title, xKey, yKey, colors]);

  return <AgCharts options={options}/>;
};

export default BarChart;
