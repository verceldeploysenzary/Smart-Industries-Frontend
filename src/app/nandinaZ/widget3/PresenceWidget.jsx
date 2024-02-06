"use client";
import { fetchWidget3 } from "@/redux/fetchWidget3";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PresenceWidget = () => {
  const responseData = useSelector((state) => state.Widget3Slice.responseData);
  const dispatch = useDispatch();
  const PresenceDeviceId = "20b3a900-06f6-11ed-8186-71e7353bf3bc";

  useEffect(() => {
    dispatch(fetchWidget3(PresenceDeviceId));
  }, [dispatch]); // Added dispatch as a dependency

  const handleClick = () => {
    if (
      responseData &&
      responseData.presence &&
      responseData.presence.length > 0
    ) {
      console.log(responseData.presence[0].value);
    }
  };

  // Set default color to red if ocuppied is not true or not available
  const ocuppied =
    responseData && responseData.presence && responseData.presence.length > 0
      ? responseData.presence[0].value
      : false;

  return (
    <div className="text-black" onClick={handleClick}>
      <h1>Desk is {ocuppied ? "free" : "ocuppied"}</h1>
      <svg
        width="80"
        height="68"
        viewBox="0 0 20 12"
        fill={ocuppied ? "black" : "red"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12V0H20V12H18V10H14V12H12V2H2V12H0ZM14 4H18V2H14V4ZM14 8H18V6H14V8Z"
          fill={ocuppied ? "black" : "red"}
        />
      </svg>
    </div>
  );
};

export default PresenceWidget;
