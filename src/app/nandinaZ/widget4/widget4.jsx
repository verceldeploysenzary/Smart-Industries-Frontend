"use client";
import { fetchWidget4 } from "@/redux/fetchWidget4";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

const CustomMap = dynamic(() => import("./Leaflet"), { ssr: false });

const WidgetAdvantgrid = () => {
  const data = useSelector((state) => state.Widget4Slice.responseData);
  const dispatch = useDispatch();
  const AdvantgridDeviceId = "e237adb0-4b1c-11ec-a079-eb4a8edd9615";

  useEffect(() => {
    dispatch(fetchWidget4(AdvantgridDeviceId));
  }, [dispatch]);

  const ver = () => {
    console.log(data.LrrLAT[0].value);
    console.log(data.LrrLON[0].value);
  };

  return (
    <div className="w-full text-black">
      {data && (
        <div>
          {" "}
          <h1>Advantgrid</h1>
          <button onClick={() => ver()}>VER</button>
          <CustomMap
            param1={data.LrrLAT[0].value}
            param2={data.LrrLON[0].value}
          />
        </div>
      )}
    </div>
  );
};

export default WidgetAdvantgrid;
