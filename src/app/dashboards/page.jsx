"use client";
import CardDashboard from "@/components/CardDashboard";
import { fetchalldashboards } from "@/redux/fetchalldashboards";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AllDashboardSlice.data);

  useEffect(() => {
    dispatch(fetchalldashboards());
  }, [dispatch]);

  return (
    <div className="text-black w-full h-[90vh]">
      <Link href={`/devices`} as={`/devices`}>
        <button>devices</button>
      </Link>
      {data && data.length > 0 ? (
        <table className="w-9/12 mx-auto bg-white">
          <thead>
            <tr className="text-left text-[#213645] text-md">
              <th>Created Time</th>
              <th>Name</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((item) => {
              if (item.title !== "Devices" && item.title !== "Alarms") {
                var date = new Date(item.createdTime);
                var formattedDate =
                  date.getFullYear() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getDate() +
                  " " +
                  date.getHours() +
                  ":" +
                  date.getMinutes();

                return (
                  <CardDashboard
                    createdDate={formattedDate}
                    name={item.name}
                    id={item.id}
                    groups={item.groups}
                  />
                );
              }
            })}
          </tbody>
        </table>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Component;
