"use client";
import { fetchWidget1 } from "@/redux/Widget1";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Widget1 = () => {
    const data = useSelector((state) => state.Widget1Slice.responseData);
    const dispatch = useDispatch();
    const GuardNandinaDoor = "60038b90-0460-11ed-8186-71e7353bf3bc";

    useEffect(() => {
        dispatch(fetchWidget1(GuardNandinaDoor));
      }, []);

    return (
    <div className="text-black flex flex-col">
         <div className="w-40 flex flex-col justify-center items-center shadow-lg p-4 rounded">

            {
                data && data.doorState[0].value === "false" ? (
                    <div>
                      <h1 className="text-red-500 text-lg mb-2">Front door is CLOSED</h1>
                      <img
                        className="w-34"
                        src="https://w7.pngwing.com/pngs/792/472/png-transparent-black-door-doors-and-windows-portal-security-door-thumbnail.png"
                        alt="Closed Door"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-green-500 text-lg mb-2">Front door is OPEN</h1>
                      <img
                        className="w-34"
                        src="https://www.seekpng.com/png/full/82-822042_opened-black-door-png-open-door-balck-png.png"
                        alt="Open Door"
                      />
                    </>
                  )}
      </div> 
    </div>
  );
};

export default Widget1;