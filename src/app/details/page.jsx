"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/slice";

const index = () => {
	/* const token = localStorage.getItem("jwt_token");
  const fullUrl =
    "https://iotlogiq.com:443/api/device/fafcfb00-6e26-11ee-a2ed-6fdb8aa7c38e"; */

	//const [data, setData] = useState([]);
	const dispatch = useDispatch();

	const data = useSelector((state) => state.AdminDashboardSlice.data);

	//*refresh

	//*attempt to fetch dashboard data
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	const handleRedirect = () => {
		window.location.href = "/searchdashboards";
	};

	return (
		<div>
			<button className="text-black" onClick={handleRedirect}>
				Go to SearchDashboards
			</button>
			<h1 className="text-black">Administration Dashboard</h1>(
			{data && data?.id?.entityType})
			<div className="text-black">
				<h2>Data: </h2>
				<p>Name: {data.name}</p>
			</div>
			{data.groups && data.groups.length > 0 && (
				<div className="text-black">
					<h3>Groups:</h3>
					<ul>
						{data.groups.map((group) => ( 
							<li key={group.id}>
								<p>{group.name}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default index;
