import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";

const DonutChart = ({ data, title, colors, textColor }) => {
  const [options, setOptions] = useState({
    data: [],
    background: { fill: "transparent" },
    title: {
      text: title,
      fontSize: 18,
      fontWeight: "bold",
      color: textColor, // Title color
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
        fills: colors,
        stroke: textColor, // Border color for slices
        calloutLabel: {
          enabled: true,
          color: textColor, // Color for callout label text
          fontWeight: 'bold',
        },
        sectorLabel: {
          color: textColor, // Color for sector labels, if any
        },
      },
    ],
    legend: {
      position: "bottom",
      item: {
        label: {
          color: textColor, // Color for legend text
        },
      },
    },
  })
  // Update options when `data`, `title`, or `colors` change
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: data,
      title: {
        text: title,
        color: textColor,
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
