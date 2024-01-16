"use client";
import { fetchDevicesNandina } from "@/redux/getNandinaDevices";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Widget1 from "./widget1/Sensative-01C769";
import Widget2 from "./widget2/Sensative-01B80C";
import Abeeway from "./widget3/Abeeway";
import WidgetAbeeway from "./widget3/Abeeway";
import WidgetAdvantgrid from "./widget4/Advantgrid";
import NavBar from "@/components/NavBar/NavBar";

const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NandinaDeviceSlice.data);

  const [GuardNandinaDoorObject, setGuardNandinaDoorObject] = useState(null);
  const [NandinaPresence, setNandinaPresence] = useState(null);
  const [NandinaAbeeway, setNandinaAbeeway] = useState(null);
  const [NandinaAdvantGrid, setNandinaAdvantGrid] = useState(null);

  useEffect(() => {
    dispatch(fetchDevicesNandina());
  }, [dispatch]);

  const LoadInfo = () => {
    //1
    const GuardNandinaDoor = "60038b90-0460-11ed-8186-71e7353bf3bc";
    const foundObjectGuardNandinaDoor = data.find(
      (item) => item.id === GuardNandinaDoor
    );
    if (foundObjectGuardNandinaDoor) {
      setGuardNandinaDoorObject(foundObjectGuardNandinaDoor);
    }
    //2
    const PresenceNandina = "20b3a900-06f6-11ed-8186-71e7353bf3bc";
    const foundNandinaPresence = data.find(
      (item) => item.id === PresenceNandina
    );
    if (foundNandinaPresence) {
      setNandinaPresence(foundNandinaPresence);
    } 
    //3
    const AbeewayNandina = "4c910140-9ff8-11ec-a34c-15612845b04e";
    const foundAbeeway = data.find((item) => item.id === AbeewayNandina);
    if (foundAbeeway) {
      setNandinaAbeeway(foundAbeeway);
    } 
    //4
    const AdvantGridNandina = "e237adb0-4b1c-11ec-a079-eb4a8edd9615";
    const foundAdvantGridy = data.find((item) => item.id === AdvantGridNandina);
    if (foundAdvantGridy) {
      setNandinaAdvantGrid(foundAdvantGridy);
    } 
  };

  //aca termina LoadInfo

  useEffect(() => {
    LoadInfo();
  }, [data]);

  return (
    <div className="text-black flex flex-col">
      <NavBar/>
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
        {NandinaAbeeway && <WidgetAbeeway NandinaAbeeway={NandinaAbeeway} />}
      </div>
      <div>
        {NandinaAdvantGrid && <WidgetAdvantgrid NandinaAdvantGrid={NandinaAdvantGrid} />}
        </div>
    </div>
  );
};

export default Component;
