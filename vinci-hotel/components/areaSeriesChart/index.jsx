import React from "react";
import { AgCharts } from "ag-charts-react";

const AreaSeriesChart = ({ title, data, series }) => {
  const options = {
    title: {
      text: title,
    },
    data: data,
    series: series,
  };

  return <AgCharts options={options} />;
};

export default AreaSeriesChart;