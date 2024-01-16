import { useState } from "react";
import EchartsStackLine from "@/components/Echarts/EchartsStackLine";

const WidgetAbeeway = ({ NandinaAbeeway }) => {
  const foundObject = NandinaAbeeway;
  const [obj, setObj] = useState(
    foundObject?.allData?.find((item) => item.id.id === NandinaAbeeway.id)
  );
  const lastTemperatures = foundObject.unArrageData.temperature.slice(0, 10);

  const propertyNames =
    lastTemperatures.length > 0
      ? Object.keys(lastTemperatures[0])
      : [];

  const lastTemperaturesProseced = propertyNames.reduce((acc, propName) => {
    acc[propName] = lastTemperatures.map((temp) => temp[propName]);
    return acc;
  }, {});


  return (
    <div className="text-black w-1/2">
    <EchartsStackLine lastTemperaturesProseced={lastTemperaturesProseced}/>
      {/* <CustomMap /> */}
    </div>
  );
};

export default WidgetAbeeway;
