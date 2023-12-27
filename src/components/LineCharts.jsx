import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineCharts({ datas, property, firstObjects }) {
  const tsArray = datas.map((item) => item.ts);
  const values = datas.map((item) => item.value);
  const maxDataLength = 10;

  // Historical data as refs
  const historicalTsArrayRef = useRef(tsArray.slice(0, maxDataLength).reverse());
  const historicalValuesRef = useRef(values.slice(0, maxDataLength).reverse());

  const newData = firstObjects[property][0] || [];

  const timeArray = historicalTsArrayRef.current.map((timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: property?.charAt(0).toUpperCase() + property?.slice(1),
        data: historicalValuesRef.current,
        tension: 0.5,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 2,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      scales: {
        y: {
          min: 0,
        },
        x: {
          ticks: { color: "rgb(255, 99, 132)" },
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  useEffect(() => {
    const newTs = newData.ts;
    const newValue = newData.value;

    // Update historical data using push and unshift
    historicalTsArrayRef.current.push(newTs);
    historicalValuesRef.current.push(newValue);

    if (historicalTsArrayRef.current.length > maxDataLength) {
      historicalTsArrayRef.current.unshift();
      historicalValuesRef.current.unshift();
    }
  }, [newData]);



  return (
    <div className="flex w-fit">
      <Line options={options} data={data} />
    </div>
  );
}