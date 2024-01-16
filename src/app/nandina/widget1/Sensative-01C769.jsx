import { fetchDevicesNandina } from "@/redux/getNandinaDevices";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchOneDevice } from "@/redux/fetchOneDevice";
import { fetchManyDevices } from "@/redux/fetchManyDevices";

const Widget1 = ({GuardNandinaDoorObject}) => {

  const foundObject = GuardNandinaDoorObject;
  const state = foundObject?.unArrageData?.doorState[0]?.value; 

  const [obj, setObj] = useState(foundObject.allData.find((item) => item.id.id === GuardNandinaDoorObject.id));

  return (
    <div className="text-black flex flex-col">


      <div className="w-40 flex flex-col justify-center items-center shadow-lg p-4 rounded">
        <h1 className="text-black mb-4">{obj?.label}</h1>

        {state === "true" ? (
          <>
            <h1 className="text-green-500 text-lg mb-2">OPEN</h1>
            <img
              className="w-54"
              src="https://www.seekpng.com/png/full/82-822042_opened-black-door-png-open-door-balck-png.png"
              alt="Open Door"
            />
          </>
        ) : (
          <>
            <h1 className="text-red-500 text-lg mb-2">CLOSED</h1>
            <img
              className="w-54"
              src="https://w7.pngwing.com/pngs/792/472/png-transparent-black-door-doors-and-windows-portal-security-door-thumbnail.png"
              alt="Closed Door"
            />
          </>
        )}
      </div> 
    </div>
  );
};

export default Widget1;
