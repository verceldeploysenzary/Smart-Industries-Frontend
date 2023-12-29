import React, { useState, useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

export default function SplineComponentVanilla({ firstObjects }) {
  let firstobj = {};
  let secondobj = {};
  let properties = [];

  if (firstObjects && Object.keys(firstObjects).length > 0) {
    const allProperties = Object.keys(firstObjects);
    allProperties.forEach((property, index) => {
      properties.push(property);

      const firstObject = firstObjects[property][0].value;
      if (index === 0) {
        firstobj = firstObject;
      }

      if (index === 1) {
        const secondObject = firstObjects[property][0].value;
        secondobj = secondObject;
      }
    });
  }


  const [obj, setObj] = useState(null);
  const [col1, setCol1] = useState(null);
  const [var1, setVar1] = useState(null);
  const [vars, setVars] = useState(null);
  const [col3Name, setCol3Name] = useState(null);
  const text = useRef();
  const splineRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById("yourCanvasId");
    const spline = new Application(canvas);
    splineRef.current = spline;

    const onLoad = (spline) => {};

    spline
      .load("https://prod.spline.design/O2lvu7CVclukW2ag/scene.splinecode")
      /* .then(() => {
        const newObj = spline.findObjectByName("Rectangle2");
        setObj(newObj);
        const var1 = spline.getVariable("HCol2 ");
        const col3Name = spline.getVariable("Col3Name");
        const variables = spline.getVariables("");
        setCol3Name(col3Name);
        setVars(variables);
        setVar1(var1);
        onLoad(spline);
      }); */
  }, []);

  const setVar = () => {
    if (Object.keys(firstobj).length > 0 && splineRef.current) {
      splineRef.current.setVariable("HCol2 ", firstobj * 10);
      splineRef.current.setVariable("H Col 3", secondobj * 10);
      splineRef.current.setVariable("HCol", firstobj * 10);
      splineRef.current.setVariable("Col2Name", properties[0]);
      splineRef.current.setVariable("Col3Name", properties[1]);
      splineRef.current.setVariable("Col3Value", secondobj + "HR");
      splineRef.current.setVariable("Col2Value", firstobj + "°C");
    }
  };

  
  useEffect(() => {
    setVar();
  }, [firstobj]);

  const ver = () => {
/*     console.log("firstobj:", firstobj);
    console.log("secondobj:", secondobj);
    console.log("properties:", properties); */
  };

  return (
    <div>
      <canvas id="yourCanvasId" width="600" height="400"></canvas>
      <button onClick={ver}>VER</button>
      <button onClick={setVar}>CAMBIAR</button>
    </div>
  );
}
