"use client";

//add login function
export async function handleLoginAfterRefresh() {
	const fullUrl = "https://iotlogiq.com/api/auth/login"; //***search refresh login
	const refresh_token = localStorage.getItem("refresh_token");

	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refresh_token,
		}),
	};

	// Make HTTP request
	fetch(fullUrl, options)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// Handle request if needed
			if (data.token) {
				const timeExpiration5Hs = new Date(
					new Date().getTime() + 5 * 60 * 60 * 1000
				);
				localStorage.setItem("refresh_token", data.token);
				localStorage.setItem("jwt_token", data.token);
				localStorage.setItem("jwt_token_expiration", timeExpiration5Hs);
				window.location.href = "/home";
			} else {
				//alert("data invalid");
			}
		})
		.catch((error) => {
			// Handle errors
			console.error("Error sending request:", error);
		});
}
