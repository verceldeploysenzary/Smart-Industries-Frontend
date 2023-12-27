export const LineChartAux = (data) => {
  if (!data) {
    return { timestamps: [], temperature: [] };
  }

  let result = {};

  Object.keys(data).forEach((timestamp) => {
    const temperatureArray = data[timestamp];

    if (Array.isArray(temperatureArray) && temperatureArray.length > 0) {
      const temperatureValue = temperatureArray[0].temperature;
      if (temperatureValue) {
        result.timestamps = result.timestamps || [];
        result.timestamps.push(timestamp);

        result.temperature = result.temperature || [];
        result.temperature.push(temperatureValue);
      }
    }

    if (Array.isArray(temperatureArray) && temperatureArray.length > 0) {
      temperatureArray.forEach((item, index) => {
        Object.keys(item).forEach((property) => {
          if (!result[property]) {
            result[property] = [];
          }

          const propertyValue = item[property];
          if (propertyValue !== undefined) {
            result[property].push(propertyValue);
          }
        });
      });
    }
  });
  Object.keys(result).forEach((property) => {
    if (Array.isArray(result[property])) {
      result[property] = result[property].reverse();
    }
  });

  return result;
};


