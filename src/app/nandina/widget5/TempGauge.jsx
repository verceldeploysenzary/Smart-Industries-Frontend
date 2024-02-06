import { useState } from "react";
import EcharGaugeAbeeway from "@/components/Echarts/EcharGaugeAbeeway";
import EchartGauge from "@/components/Echarts/EchartGauge";

const TempGaugeAbeeway = ({ NandinaAbeeway }) => {
  const foundObject = NandinaAbeeway;
  const [obj, setObj] = useState(
    foundObject?.allData?.find((item) => item.id.id === NandinaAbeeway.id)
  );
  const lastTemperatures = foundObject.unArrageData.temperature.slice(0, 10);

  const propertyNames =
    lastTemperatures.length > 0 ? Object.keys(lastTemperatures[0]) : [];

  const lastTemperaturesProseced = propertyNames.reduce((acc, propName) => {
    acc[propName] = lastTemperatures.map((temp) => temp[propName]);
    return acc;
  }, {});
   
  return (
    <div className="text-black w-1/2 h-1/2 bg-slate-500">
     {/* <EcharGaugeAbeeway lastTemperatureProseced={lastTemperaturesProseced.value[0]} />  */}
      
   <EchartGauge /> 
 </div>
  );
};

export default TempGaugeAbeeway;
