"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeviceAtributes } from "@/redux/FetchDeviceAtributes";

const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DeviceAtributesSlice);

  useEffect(() => {
    dispatch(fetchDeviceAtributes());
  }, [dispatch]);

  const properties = data.data;

  const ver = () => {
    console.log(properties);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-0 ml-4 mr-4 h-[100vh] ">
        {properties && Object.keys(properties).length > 0 && (
          <table className="text-black mt-4">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Device Properties</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(properties).map((propertyName, index) => (
                <tr key={index}>
                  <td>{propertyName}</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th className="pr-8">Object Property</th>
                          <th className="pr-8">Object Value</th>
                          <th className="pr-8">Object Property</th>
                          <th className="pr-8">Object Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties[propertyName].map((obj, objIndex) => (
                          <tr key={objIndex}>
                            {Object.keys(obj).map((propName, propIndex) => (
                              <React.Fragment key={propIndex}>
                                <td>{propName}</td>
                                <td>{obj[propName]}</td>
                              </React.Fragment>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Component;
