"use client";
import { fetchallDevices } from "@/redux/fetchAllDevices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdState } from "@/redux/IdState";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Component = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.AllDashboardSlice.data);
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchallDevices());
  }, [dispatch]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleItemClick = (itemId) => {
};

  const handleSearch = () => {
    const filteredData = initialData.filter(
      (item) =>
        item.title !== "Devices" &&
        item.title !== "Alarms" &&
        item.name.toLowerCase().includes(searchText.toLowerCase())
        );
    setData(filteredData);
  };

  const handleReset = () => {
    dispatch(fetchallDevices());
    setData(initialData);
  };

  const handleRealtimeData = (itemName) => {
    setIdStateAndGo(itemName, "realtime");
  };

  const handleLastTelemetries = (itemName) => {
    setIdStateAndGo(itemName, "telemetries");
  };

  const setIdStateAndGo = (itemName, buttonText) => {
    const itemId = data.find((item) => item.name === itemName)?.id.id;
    if (itemId) {
      dispatch(setIdState(buttonText));
      router.push(`/devices/${itemId}`);
    }
  };


  return (
    <div>
    <Link href={`/nandina`} as={`/nandina`}>
        <button className="w-/2 mx-auto bg-black text-white">Nandina</button>
      </Link>
      <div className="flex justify-center items-center">
        <div className="text-center">
          <input
            type="text"
            placeholder="Enter text to filter"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mb-2 text-black"
          />
          <br />
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded mr-2"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-black w-full h-[40vh]">
  {data && data.length > 0 ? (
    <div className="w-9/12 mx-auto bg-white mt-8">
      <h1 className="text-xl font-bold mb-2">DEVICES: {data.length} </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.slice(0, 20).map((item) => (
          <div
            className="border border-gray-300 p-4 rounded-lg cursor-pointer"
            onClick={() => handleItemClick(item.id.id)}
            key={item.id.id} 
          >
            <h1 className="text-xl font-bold mb-2">{item.name}</h1>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500 transition duration-1000"
              onClick={() => handleRealtimeData(item.name)}
            >
              Realtime Data
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-1000"
              onClick={() => handleLastTelemetries(item.name)}
            >
              Last Telemetries
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center">
      <h1>Loading...</h1>
    </div>
  )}
</div>

    </div>
  );
};

export default Component;
