import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";  // Vérifiez que ce chemin est correct

const DonutChart = ({ data, title }) => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: title,
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  });

  // Mettre à jour les options quand `data` ou `title` changent
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: data,
      title: {
        text: title,
      },
    }));
  }, [data, title]);

  return <AgCharts options={options} />;
};

export default DonutChart;
