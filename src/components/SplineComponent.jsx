"use client";
import Spline from "@splinetool/react-spline";
import { useRef, useEffect } from "react";

export default function SplineComponent({ temperature }) {
  const cube = useRef();

  useEffect(() => {
    if (cube.current) {
      cube.current.scale.z = temperature / 2;
    }
  }, [temperature]);

  function onLoad(spline) {
    const obj = spline.findObjectByName("Rectangle2");
    console.log(obj);
    cube.current = obj;
  }

  const ver = () => {
    console.log(cube.current);
  };

  return (
    <div>
      <Spline
        scene="https://prod.spline.design/O2lvu7CVclukW2ag/scene.splinecode"
        onLoad={onLoad}
      />
      <button className="text-black" onClick={() => ver()}>
        VER
      </button>
      <h1 className="text-black">{temperature}</h1>
    </div>
  );
}
