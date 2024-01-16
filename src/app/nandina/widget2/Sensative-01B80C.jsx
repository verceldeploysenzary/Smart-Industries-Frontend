import React, { useEffect, useState } from "react";

const Widget2 = ({ NandinaPresence }) => {
  const foundObject = NandinaPresence;

  const state = foundObject.unArrageData.presence[0].value;
  const [obj, setObj] = useState(foundObject.allData.find((item) => item.id.id === NandinaPresence.id));



  return (
    <div className="text-black flex flex-col">

    <div className="w-40 flex flex-col justify-center items-center shadow-lg p-4 rounded">
    <h1 className="text-black mb-4">{obj?.label}</h1>

      {state === "true" ? (
        <>
          <h1 className="text-green-500 text-lg mb-2">Desk Is FREE</h1>
          <img
            className="w-40"
            src="https://thumbs.dreamstime.com/b/table-office-desk-computer-sideview-icon-vector-illustration-sign-isolated-background-table-office-desk-computer-102115155.jpg"
            alt="Desk Empty"
          />
        </>
      ) : (
        <>
          <h1 className="text-red-500 text-lg mb-2">Desk Is OCCUPIED</h1>
          <img
            className="w-40"
            src="https://cdn-icons-png.flaticon.com/512/49/49734.png"
            alt="Desk Ocupied"
          />
        </>
      )}
    </div>
    </div>
  );

};

export default Widget2;
