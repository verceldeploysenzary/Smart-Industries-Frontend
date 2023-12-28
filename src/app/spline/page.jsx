"use client";
import Spline from "@splinetool/react-spline";
import { useRef, useState, useEffect } from "react";

export default function Splines() {
  const cube = useRef();
  const [scaleZ, setScaleZ] = useState(1); // Initial scale.z value
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // This effect runs whenever scaleZ changes
    if (cube.current) {
      cube.current.scale.z = scaleZ;
    }
  }, [scaleZ]);

  function onLoad(spline) {
    const obj = spline.findObjectByName("Rectangle2");
    console.log(obj);
    cube.current = obj;
  }

  function updateScaleZ(delta) {
    setScaleZ((prevScaleZ) => prevScaleZ + delta);
  }

  function updateScaleZFromInput() {
    const parsedValue = Number(inputValue);
    if (!isNaN(parsedValue)) {
      setScaleZ(parsedValue);
    } else {
      console.log("error");
    }
  }


     const ver =()=>{
      console.log(cube.current);
     }
  return (
    <div>
      <Spline
        scene="https://prod.spline.design/O2lvu7CVclukW2ag/scene.splinecode"
        onLoad={onLoad}
      />
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between mb-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-40 text-black bg-gray-200 rounded-md text-sm p-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="text-blue-500 bg-gray-200 hover:bg-blue-100 px-4 py-2 rounded-md"
            type="button"
            onClick={updateScaleZFromInput}
          >
            Go
          </button>
        </div>
      </div>
      <button
        className="text-black bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        type="button"
        onClick={() => updateScaleZ(1)}
      >
        Up
      </button>
      <button
        className="text-black bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
        type="button"
        onClick={() => updateScaleZ(-1)}
      >
        Down
      </button>
      <button
        className="text-black bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
        type="button"
      >
        scale: {scaleZ}
      </button>
      <button className="text-black" onClick={()=>ver()}>VER</button>

    </div>
  );
}
