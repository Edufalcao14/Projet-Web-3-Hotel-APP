"use client";

import React, {useEffect, useState} from "react";
import {AgCharts} from "ag-charts-react";

const LineChart = ({data = [], title, xKey, yKey = [], colors}) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const series = yKey.map((key, index) => ({
      type: "line",
      xKey: xKey,
      yKey: key,
      stroke: colors[index],
      fill: colors[index],
      lineWidth: 2,
      marker: {
        fill: colors[index],
        stroke: colors[index],
      },
    }));

    setOptions({
      data,
      title: {text: title},
      series,
      legend: {position: "bottom"},
    });
  }, [data, title, xKey, yKey, colors]);

  return <AgCharts options={options}/>;
};

export default LineChart;
