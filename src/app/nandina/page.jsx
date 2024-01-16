"use client";
import { fetchDevicesNandina } from "@/redux/getNandinaDevices";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Widget1 from "./widget1/Sensative-01C769";
import Widget2 from "./widget2/Sensative-01B80C";

const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NandinaDeviceSlice.data);

  const [GuardNandinaDoorObject, setGuardNandinaDoorObject] = useState(null);
  const [NandinaPresence, setNandinaPresence] = useState(null);

  useEffect(() => {
    dispatch(fetchDevicesNandina());
  }, [dispatch]);



  const Cargar = () => {
    const GuardNandinaDoor = "60038b90-0460-11ed-8186-71e7353bf3bc";
    const foundObjectGuardNandinaDoor = data.find(
      (item) => item.id === GuardNandinaDoor
    );
    if (foundObjectGuardNandinaDoor) {
      console.log(foundObjectGuardNandinaDoor);
      setGuardNandinaDoorObject(foundObjectGuardNandinaDoor);
    } else {
      console.log(`Object with id ${GuardNandinaDoor} not found.`);
    }

    const PresenceNandina = "20b3a900-06f6-11ed-8186-71e7353bf3bc";
    const foundNandinaPresence = data.find(
      (item) => item.id === PresenceNandina
    );
    if (foundNandinaPresence) {
      console.log(foundNandinaPresence);
      setNandinaPresence(foundNandinaPresence);
    } else {
      console.log(`Object with id ${PresenceNandina} not found.`);
    }
  };

  useEffect(() => {
    Cargar();
  }, [data]);
  
  const ver2 = () => {
    console.log(data);
  };
  return (
    <div className="text-black flex flex-col">
      <button onClick={() => Cargar()}>Cargar</button>
      <button onClick={() => ver2()}>VER2</button>

      <div className="flex justify-center items-center">
        <div className="text-black flex flex-col">
          {/* {data &&
            data.length > 0 &&
            data[0]?.allData.map((item) => (
              <div key={item.name} className="mb-2">
                <h1>{item.label} + {item.name} + {item.id.id}</h1>
              </div>
            ))}  */}
        </div>
      </div>

      <div className="flex flex-row">
        {GuardNandinaDoorObject && (
          <Widget1 GuardNandinaDoorObject={GuardNandinaDoorObject} />
        )}
        {NandinaPresence && <Widget2 NandinaPresence={NandinaPresence} />}
      </div>
    </div>
  );
};

export default Component;
