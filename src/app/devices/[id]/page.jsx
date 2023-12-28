"use client";
import { LineChartAux } from "@/components/LineChartAux";
import { LineCharts } from "@/components/LineCharts";
import SplineComponent from "@/components/SplineComponent";
import TimeInputs from "@/components/TimeInputs";
import TimeseriesCard from "@/components/TimeseriesCard";
import { fetchDeviceAtributes } from "@/redux/FetchDeviceAtributes";
import { setIdState } from "@/redux/IdState";
import { fetchOneDevice } from "@/redux/fetchOneDevice";
import { WebSocketAPIExample, disconnectWebSocket } from "@/redux/socketConect";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Component = ({ params }) => {
  const dispatch = useDispatch();
  const unArrengedata = useSelector(
    (state) => state.DeviceAtributesSlice.secondResponse
  );
  const data = useSelector((state) => state.DeviceAtributesSlice.arrageData);

  const status = useSelector((state) => state.DeviceAtributesSlice.status);
  const DateGenerateSlice = useSelector((state) => state.DateGenerateSlice);
  const startDateTimestamp = DateGenerateSlice.startDateTimestamp;
  const endDateTimestamp = DateGenerateSlice.endDateTimestamp;
  const IdStateSlice = useSelector((state) => state.IdStateSlice.idState);
  const deviceData = useSelector((state) => state.OneDeviceSlice);

  const [isConnected, setIsConnected] = useState(false);
  const [connectButtonColor, setConnectButtonColor] = useState("gray");
  const [closeConection, setCloseConection] = useState(false);
  const [lineStats, setLineStats] = useState("");

  const [showTimeInputs, setShowTimeInputs] = useState(true);
  const [isLineChartsVisible, setIsLineChartsVisible] = useState(true);

  const [unArrengeData, setUnArrengeData] = useState(null);
  const [firstObjects, setFirstObjects] = useState(null);

  const [isSplineVisible, setIsSplineVisible] = useState(false);
  const toggleSplineVisibility = () => {
    setIsSplineVisible(!isSplineVisible);
  };

  useEffect(() => {
    if (unArrengedata) {
      const newFirstObjects = {};
      Object.keys(unArrengedata).forEach((property) => {
        const objectsInsideArray = unArrengedata[property];
        if (objectsInsideArray && Array.isArray(objectsInsideArray)) {
          const firstObject = objectsInsideArray[0];
          newFirstObjects[property] = [firstObject];
        }
      });
      setFirstObjects(newFirstObjects);
    }
  }, [unArrengedata]);

  useEffect(() => {
    dispatch(
      fetchDeviceAtributes({
        id: params.id,
        startDateTimestamp: startDateTimestamp,
        endDateTimestamp: endDateTimestamp,
      })
    );
    dispatch(fetchOneDevice(params.id));
  }, [dispatch, params.id, startDateTimestamp, endDateTimestamp]);

  let properties = "";
  const toggleTimeInputs = () => {
    setShowTimeInputs(!showTimeInputs);
  };
  if (data) {
    properties = Object.keys(data);
  }
  const visibleProperties = useMemo(() => properties.slice(0, 5), [properties]);
  const id = params.id;

  const connectSocket = (id) => {
    WebSocketAPIExample(id, dispatch, startDateTimestamp, endDateTimestamp);
    setIsConnected(true);
    setConnectButtonColor("green");
  };

  const disconnectSocket = (id) => {
    setIsConnected(false);
    setConnectButtonColor("gray");
    setCloseConection(true);
    disconnectWebSocket();
  };
  const openConection = () => {
    setCloseConection(false);
  };

  const backToDevices = () => {
    setIsConnected(false);
    setConnectButtonColor("gray");
    setCloseConection(true);
    disconnectWebSocket();
    window.location.href = "/devices";
  };

  const extractPropertiesWithValues = () => {
    const extractedProperties = new Set();
    const propertiesWithValues = [];
    if (data) {
      Object.keys(data).forEach((property) => {
        const objectsInsideArray = data[property];
        if (objectsInsideArray && Array.isArray(objectsInsideArray)) {
          objectsInsideArray.forEach((objectInsideArray) => {
            if (objectInsideArray && typeof objectInsideArray === "object") {
              const objectProperties = Object.keys(objectInsideArray);
              objectProperties.forEach((property) => {
                extractedProperties.add(property);
              });
            }
          });
        }
      });
      const findFirstValue = (property) => {
        for (const prop in data) {
          const objectsInsideArray = data[prop];

          for (const objectInsideArray of objectsInsideArray) {
            if (objectInsideArray && typeof objectInsideArray === "object") {
              const objectValue = objectInsideArray[property];

              if (objectValue !== undefined) {
                return objectValue;
              }
            }
          }
        }
        return null;
      };
      const uniqueProperties = Array.from(extractedProperties);
      uniqueProperties.forEach((property) => {
        const firstValue = findFirstValue(property);
        propertiesWithValues.push({ property, value: firstValue });
      });
    }

    return propertiesWithValues;
  };

  const propertiesWithValues = useMemo(
    () => extractPropertiesWithValues(),
    [data, properties]
  );
  useEffect(() => {
    if (visibleProperties.length > 0 && !isConnected && !closeConection) {
      connectSocket(id);
      setIsConnected(!isConnected);
    }
  }, [visibleProperties]);

  const handleRealtimeData = () => {
    setIdStateAndGo("realtime");
  };

  const handleLastTelemetries = () => {
    setIdStateAndGo("telemetries");
  };

  const setIdStateAndGo = (buttonText) => {
    dispatch(setIdState(buttonText));
  };

  useEffect(() => {
    if (!IdStateSlice) {
      handleLastTelemetries();
    }
  }, [IdStateSlice, handleLastTelemetries]);

  const getlinechartdata = () => {
    setLineStats(LineChartAux(data));
  };

  const renderLineCharts = () => {
    const charts = [];

    const numericProperties = Object.keys(unArrengedata).filter((property) =>
      unArrengedata[property].every((obj) => !isNaN(Number(obj.value)))
    );

    numericProperties.forEach((property) => {
      const chartData = {
        datas: unArrengedata[property],
        property: property,
        firstObjects: firstObjects,
      };
      charts.push(
        <div key={property} className="w-full">
          <h2 className="text-xl font-bold mb-4">{property}</h2>
          <LineCharts {...chartData} />
        </div>
      );
    });

    return charts;
  };
  useEffect(() => {
    getlinechartdata(data);
  }, [data]);

  const socket = () => {
    connectSocket(id);
  };

  return (
    <div className="text-black w-full flex flex-col ">
      <div className="flex flex-row">
        <button
          onClick={() => backToDevices()}
          className="bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold px-4 py-2 w-1/6 mx-8 my-8"
        >
          BACK TO DEVICES
        </button>
        <button
          onClick={toggleTimeInputs}
          className="bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold px-4 py-2 w-1/6 mx-8 my-8"
        >
          {showTimeInputs ? "HIDE TIME INPUTS" : "SHOW TIME INPUTS"}
        </button>
        <button
          onClick={() => setIsLineChartsVisible(!isLineChartsVisible)}
          className="bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold px-4 py-2 w-1/6 mx-8 my-8"
        >
          {isLineChartsVisible ? "HIDE LINE CHARTS" : "SHOW LINE CHARTS"}
        </button>
        <div className="flex flex-row gap-4 justify-center mx-auto">
          <button
            className={`${isConnected ? "bg-green-200" : "bg-gray-200"} hover:${
              isConnected ? "bg-green-300" : "bg-gray-300"
            }-300 text-black rounded font-semibold h-1/2 px-4 py-2 mx-8 my-8`}
            onClick={() => openConection()}
          >
            {isConnected ? "CONNECTED" : "CONNECT SOCKET"}
          </button>
          <button
            className={`${isConnected ? "bg-gray-200" : "bg-red-200"} hover:${
              isConnected ? "bg-gray-300" : "bg-red-300 "
            }-300 text-black rounded font-semibold h-1/2 px-4 py-2 mx-8 my-8`}
            onClick={() => disconnectSocket(id)}
          >
            DISCONNECT SOCKET
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold px-4 py-2 mx-8 my-8"
            onClick={toggleSplineVisibility}
          >
            {isSplineVisible ? "Hide Spline" : "Show Spline"}
          </button>
        </div>
      </div>
      {showTimeInputs && <TimeInputs />}
      {isLineChartsVisible &&
        lineStats &&
        lineStats?.timestamps?.length > 0 && (
          <div className="grid grid-cols-2 gap-3 justify-content-center mx-auto mb-20">
            {renderLineCharts()}
          </div>
        )}
      <div></div>
      <h1 className="text-2xl font-bold text-center text-gray-900">
        {deviceData.data && deviceData.data[0] && deviceData.data[0].name
          ? `Device Name: ${deviceData.data[0].name}`
          : "No Device Name Available"}
      </h1>
      <div className="flex flex-row gap-4 justify-center mx-auto">
        <button
          className={`${
            IdStateSlice === "realtime" ? "bg-green-200" : "bg-gray-200"
          } hover:${
            IdStateSlice === "realtime" ? "bg-green-300" : "bg-gray-300"
          }-300 text-black rounded font-semibold px-4 py-2`}
          onClick={() => handleRealtimeData()}
        >
          Realtime Data
        </button>

        <button
          className={`${
            IdStateSlice === "telemetries" ? "bg-red-200" : "bg-gray-200"
          } hover:${
            IdStateSlice === "telemetries" ? "bg-red-300" : "bg-gray-300"
          }-300 text-black rounded font-semibold px-4 py-2`}
          onClick={() => handleLastTelemetries()}
        >
          Last Telemetries
        </button>
      </div>
      {/* REAL TIME PLATE */}
      {IdStateSlice === "realtime" && propertiesWithValues.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="border rounded-md shadow-md p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-screen-md mx-auto mb-20">
            {propertiesWithValues.map((item) => (
              <div key={item.id} className="text-center">
                <span className="font-bold">{item.property}:</span> {item.value}
              </div>
            ))}
          </div>
        </div>
      )}
      {IdStateSlice === "telemetries" && visibleProperties.length > 0 && (
        <>
          {visibleProperties.map((propertyName, propertyIndex) => (
            <TimeseriesCard
              key={propertyIndex}
              data={data}
              propertyName={propertyName}
              propertyIndex={propertyIndex}
            />
          ))}
        </>
      )}
      {status === "failed" ||
        (propertiesWithValues.length === 0 && (
          <div className="border rounded-lg shadow-md p-8 bg-white max-w-7xl mx-auto w-75">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              There is no telemetry to show on this device within that time
              range
            </h1>
          </div>
        ))}
      <div>
        {isSplineVisible &&
          firstObjects?.temperature &&
          firstObjects.temperature[0]?.value && (
            <div className="w-3/4 mx-auto">
              <SplineComponent
                temperature={firstObjects.temperature[0].value}
              />
            </div>
          )}
      </div>{" "}
    </div>
  );
};

export default Component;
