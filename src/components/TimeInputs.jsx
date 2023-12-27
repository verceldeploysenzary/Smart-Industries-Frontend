import { setDateTimestamps } from "@/redux/dateGenerate";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const TimeInputs = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  
   const [dateStartValue, setDateStartValue] = useState(
    new Date(currentDate.getTime() - 100 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  ); 

/*   const [dateStartValue, setDateStartValue] = useState(
    new Date(Date.now() - 60 * 60 * 1000).toISOString().split("T")[0]
  ); */

  const [timeStartValue, setTimeStartValue] = useState(currentDate.getHours() + ":00");
  const [dateEndValue, setDateEndValue] = useState(currentDate.toISOString().split("T")[0]);
  const [timeEndValue, setTimeEndValue] = useState((currentDate.getHours() + 1) + ":00");

  useEffect(() => {
    const startDateTimestamp = new Date(`${dateStartValue} ${timeStartValue}`).getTime();
    const endDateTimestamp = new Date(`${dateEndValue} ${timeEndValue}`).getTime();
    dispatch(setDateTimestamps({ startDateTimestamp, endDateTimestamp }));
  }, [dispatch, dateStartValue, timeStartValue, dateEndValue, timeEndValue]);


  const handleInputChange = (inputType, value) => {
    switch (inputType) {
      case "dateStart":
        setDateStartValue(value);
        break;
      case "timeStart":
        setTimeStartValue(value);
        break;
      case "dateEnd":
        setDateEndValue(value);
        break;
      case "timeEnd":
        setTimeEndValue(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex space-x-20 border rounded-md shadow-md p-4">
        <div className="text-black flex flex-col">
          <p>Start Date</p>
          <input
            type="date"
            value={dateStartValue}
            onChange={(e) => handleInputChange("dateStart", e.target.value)}
          />
          <input
            type="time"
            value={timeStartValue}
            onChange={(e) => handleInputChange("timeStart", e.target.value)}
          />
        </div>

        <div className="text-black flex flex-col">
          <p>End Date</p>
          <input
            type="date"
            value={dateEndValue}
            onChange={(e) => handleInputChange("dateEnd", e.target.value)}
          />
          <input
            type="time"
            value={timeEndValue}
            onChange={(e) => handleInputChange("timeEnd", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeInputs;
