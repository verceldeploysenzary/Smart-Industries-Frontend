import React, { useState } from "react";

const TimeseriesCard = ({ propertyName, propertyIndex, data }) => {
  const timestamp = parseInt(propertyName);
  const formattedDate = new Date(timestamp).toLocaleString();

  const [showList, setShowList] = useState(true);
  const propertyData = data[propertyName] || [];

  const numberOfItems = propertyData.length;


  return (
    <div
      key={propertyIndex}
      className="mx-12 my-4 rounded-lg overflow-hidden bg-white shadow-md border border-gray-200"
    >   

      <div className="flex flex-row justify-content-center align-items-center bg-slate-100">
         <img
          className="w-8 cursor-pointer"
          src="https://www.svgrepo.com/show/335062/dropdown.svg"
          alt="Show details"
          onClick={() => setShowList(!showList)}
        /> 
        <h1 className="text-2xl font-bold text-center text-black mb-4  ">
          {formattedDate}
        </h1>
        <span className="ml-2 text-gray-500">({numberOfItems} items)</span>

      </div>
      {showList && (
        <ul className="w-full list-none m-auto">
          {propertyData.map((propertyObject, index) => (
            <li key={index} className="py-2 px-4 border-b border-gray-200">
              <span className="font-semibold mr-2">
                {Object.keys(propertyObject)[0]}:
              </span>
              <span>{propertyObject[Object.keys(propertyObject)[0]]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeseriesCard;
