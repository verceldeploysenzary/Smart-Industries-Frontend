export const LineChartAux = (data) => {
  if (!data) {
    return { timestamps: [], temperature: [] };
  }

  let result = {};

  Object.keys(data).forEach((timestamp) => {
    const eacheArray = data[timestamp];

    if (Array.isArray(eacheArray) && eacheArray.length > 0) {
      const temperatureValue = eacheArray[0].temperature;
      if (temperatureValue) {
        result.timestamps = result.timestamps || [];
        result.timestamps.push(timestamp);

        result.temperature = result.temperature || [];
        result.temperature.push(Number(temperatureValue)); 
      }
    }

    if (Array.isArray(eacheArray) && eacheArray.length > 0) {
      eacheArray.forEach((item, index) => {
        Object.keys(item).forEach((property) => {
          if (!result[property]) {
            result[property] = [];
          }
          const propertyValue = item[property];
          if (/^[0-9]+$/.test(propertyValue)) {
            result[property].push(Number(propertyValue));
          }
        });
      });
    }
  });

  Object.keys(result).forEach((property) => {
    if (Array.isArray(result[property]) && result[property].length === 0) {
      delete result[property];
    }
  });

  Object.keys(result).forEach((property) => {
    if (Array.isArray(result[property])) {
      result[property] = result[property].reverse();
    }
  });

  return result;
};
