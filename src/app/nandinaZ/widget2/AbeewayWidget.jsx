"use client";
import EchartGauge from "@/components/Echarts/EchartGauge";
import { fetchWidget2 } from "@/redux/fetchWidget2";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AbeewayWidget = () => {
  const data = useSelector((state) => state.Widget2Slice.responseData);
  const dispatch = useDispatch();
  const AbeewayNandinaid = "4c910140-9ff8-11ec-a34c-15612845b04e";

  useEffect(() => {
    dispatch(fetchWidget2(AbeewayNandinaid));
  }, []);

  const ver = () => {
    console.log(data.temperature[0].value);
  };
  return (
    <div className="text-black w-full">
      <div className="text-black w-1/2 h-1/2 bg-white">
        {data && <EchartGauge temp={data.temperature[0].value} />}
      </div>
    </div>
  );
};

export default AbeewayWidget;
