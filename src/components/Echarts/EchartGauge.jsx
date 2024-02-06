import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EchartGauge = ({ temp }) => {
  useEffect(() => {
    const dom = document.getElementById('chart-gauge-container');

    if (!dom) {
      console.error('Invalid DOM element');
      return;
    }

    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 30,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'inherit'
          },
          data: [
            {
              value: temp // Use the temp prop here
            }
          ]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: '#FD7347'
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: temp // Use the temp prop here
            }
          ]
        }
      ]
    };

    // Remove the setInterval for updating the chart with random values

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

    // Cleanup
    return () => {
      myChart.dispose();
      window.removeEventListener('resize', myChart.resize);
    };
  }, [temp]); // Add temp as a dependency to useEffect

  return <div id="chart-gauge-container" style={{ width: '100%', height: '400px' }} />;
};

export default EchartGauge;
