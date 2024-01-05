import React, { useEffect } from "react";
import * as echarts from "echarts";
import "echarts-gl"; // Import the ECharts GL extension

const EchartGlobe = () => {
  useEffect(() => {
    const dom = document.getElementById("chart-globe");

    if (!dom) {
      console.error("Invalid DOM element");
      return;
    }

    const myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    var ROOT_PATH = 'https://echarts.apache.org/examples';

    let option = {
        backgroundColor: '#000',
        globe: {
          baseTexture: 'https://1.bp.blogspot.com/-UUXaK5GCj-k/UcsKJRMgkVI/AAAAAAAACfM/sePP_H08JTQ/s1600/1.jpg',
           heightTexture: 'https://1.bp.blogspot.com/-UUXaK5GCj-k/UcsKJRMgkVI/AAAAAAAACfM/sePP_H08JTQ/s1600/1.jpg',
          displacementScale: 0.1, 
          shading: 'lambert',
          environment: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          light: {
            ambient: {
              intensity: 0.1
            },
            main: {
              intensity: 1.5
            }
          },
          layers: [
            /*  {
              type: 'blend',
              blendTo: 'emission',
              texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/800px-The_earth_at_night.jpg'
            }, */
            /* {
              type: 'overlay',
              texture: 'https://echarts.apache.org/examples/data-gl/asset/clouds.png',
              shading: 'lambert',
              distance: 5
            } */
          ]
        },
      series: [
        {
          type: "scatter3D",
          coordinateSystem: "globe",
          symbolSize: 2,
          data: [
            [0, 0, 0],
            [30, 30, 10],
            [-30, -30, 5],
          ],
          itemStyle: {
            color: "red",
          },
        },
      ],
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);

    // Cleanup
    return () => {
      myChart.dispose();
      window.removeEventListener("resize", myChart.resize);
    };
  }, []);

  return (
    <div id="chart-globe" style={{ width: '100%', height: '400px' }}></div>

  );
};

export default EchartGlobe;
