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

export function LineChart({ datas, propertiesWithValues, property }) {

     const ver =()=>{
      console.log(datas);
     }



     
  const chartRef = useRef(null);
  const numberDatas = datas.map((value) => Number(value)).slice(0, 20);
  const filteredNumberDatas = numberDatas.filter((value) => !isNaN(value));

  const numberPropertiesWithValues = propertiesWithValues
    .map((value) => new Date(Number(value)))
    .slice(0, 20);

  const timeArray = numberPropertiesWithValues.map((date) =>
    date.toLocaleTimeString([], { minute: "2-digit", second: "2-digit" })
  );


  const data = {
    labels: timeArray,
    datasets: [
      {
        label: property?.charAt(0).toUpperCase() + property?.slice(1),
        data: filteredNumberDatas,
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
    if (chartRef.current) {
      addData(chartRef.current.chart, timeArray[timeArray.length - 1], filteredNumberDatas[filteredNumberDatas.length - 1]);
    }
  }, [datas, propertiesWithValues]);


  return (
    <div className="flex w-fit">
{/*       <Line ref={chartRef} options={options} data={data} />
      <button onClick={()=>ver()}>VER</button> */}
<h1>hola</h1>
<button onClick={()=>ver()}>VER</button>

    </div>
  );
}

/* function addData(chart, label, data) {
  chart?.data?.labels.push(label);
  chart?.data?.datasets.forEach((dataset) => {
    dataset?.data?.push(data);
  });
  chart?.update();
}
 */