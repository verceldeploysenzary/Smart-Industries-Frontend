"use client";
import Spline from "@splinetool/react-spline";
import { useRef, useEffect } from "react";

export default function SplineComponent({ temperature }) {
  const cube = useRef();
  const text = useRef();
  const splVar = useRef();

  useEffect(() => {
    if (cube.current) {
      cube.current.scale.z = temperature / 2;
    }
  }, [temperature]);

  function onLoad(spline) {
    const obj = spline.findObjectByName("Rectangle2");
    const txt = spline.findObjectByName("Text5");
    cube.current = obj;
    text.current = txt
    const splineVar = spline.findObjectByName("HCol");
    splVar.current = splineVar
    console.log(splVar.current);
  }

  const ver = () => {
    console.log(text.current);
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
