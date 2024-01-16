import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EchartsStackLine = ({ lastTemperaturesProseced }) => {

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

    // Convert timestamps to Date objects
    const dateObjects = lastTemperaturesProseced.ts.map(timestamp => new Date(timestamp));
    const minTemperature = Math.min(...lastTemperaturesProseced.value) - 1;
    const maxTemperature = Math.max(...lastTemperaturesProseced.value) + 1;
    
    const option = {
      title: {
        text: 'Abeeway'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (params) {
          params = params[0];
          const date = new Date(params.value[0]);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' : ' + params.value[1];
        }
      },
      legend: {
        data: ['Temperature']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        data: dateObjects
      },
      yAxis: {
        type: 'value',
        min: minTemperature,
        max: maxTemperature,
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          stack: 'Total',
          data: lastTemperaturesProseced.value.map((val, index) => [dateObjects[index], val])
        },
      ]
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', myChart.resize);
    };
  }, [lastTemperaturesProseced]);

  return <div id="chart-gauge-container" style={{ width: '100%', height: '400px' }} />;
};

export default EchartsStackLine;
