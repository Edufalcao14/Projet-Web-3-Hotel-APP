import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";

const DonutChart = ({ data, title, colors }) => {
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
        fills: colors, // Set initial colors here
      },
    ],
  });

  // Update options when `data`, `title`, or `colors` change
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: data,
      title: {
        text: title,
      },
      series: [
        {
          ...prevOptions.series[0],
          fills: colors, // Update colors dynamically
        },
      ],
    }));
  }, [data, title, colors]);

  return <AgCharts options={options} />;
};

export default DonutChart;
