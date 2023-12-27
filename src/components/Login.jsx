"use client";

import React, { useState } from "react";

const Login = () => {
	const [form, setForm] = useState({ user: "", password: "" });
	const [error, setError] = useState({ user: "", password: "" });

	const fullUrl = "https://iotlogiq.com/api/auth/login";

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			username: form.user,
			password: form.password,
		};

		const headers = {
			accept: "application/json",
			"Content-Type": "application/json",
		};

		const options = {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		};

		fetch(fullUrl, options)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.token) {
					const timeExpiration5Hs = new Date(new Date().getTime() + 5 * 60 * 60 * 1000); 
					const timeExpiration5HsTS = Math.floor(timeExpiration5Hs)    
					localStorage.setItem("jwt_token_expiration", timeExpiration5HsTS)
					localStorage.setItem("refresh_token", data.token);
					localStorage.setItem("jwt_token", data.token);
					window.location.href = "/devices";
				}
				else{
					alert('data invalid')
				}
			})
			.catch((error) => {
				console.error("Error sending request:", error);
			});
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.id]: e.target.value });

		if (!validateEmail(form.user)) {
			setError({...error, user: ' Invalid email format.'})
		} else {
			setError({...error, user: ''})
		}
	};

	const validateEmail = (email) => {
		const regexMail =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return regexMail.test(email);
	};

	return (
		<div>
			<section class="main_container">
				<section class="sign_in_container">
					<form class="content_container" onSubmit={(e) => handleSubmit(e)}>
						<h1 class="title login-h1">Sign In</h1>

						<h2 class="login-h2">USERNAME</h2>
						<input
							type="text"
							class="username login-input"
							placeholder="USERNAME"
							id="user"
							value={form.user}
							onChange={(e) => handleChange(e)}
						/>
						{error?.user && (
							<p className=" text-red-500 py-1 text-sm">
								<label>{error.user}</label>
							</p>
						)}

						<h2 class="login-h2">PASSWORD</h2>
						<input
							type="password"
							class="password login-input"
							placeholder="PASSWORD"
							id="password"
							value={form.password}
							onChange={(e) => handleChange(e)}
						/>

						<button className="login-button">Sign In</button>

						<section class="fotter">
							<div class="check_container">
								<div class="checkbox-wrapper">
									<input id="terms-checkbox-37" name="checkbox" type="checkbox" />
									<label class="terms-label" for="terms-checkbox-37">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 200 200"
											class="checkbox-svg"
										>
											<mask fill="white" id="path-1-inside-1_476_5-37">
												<rect height="200" width="200"></rect>
											</mask>
											<rect
												mask="url(#path-1-inside-1_476_5-37)"
												stroke-width="40"
												class="checkbox-box"
												height="200"
												width="200"
											></rect>
											<path
												stroke-width="15"
												d="M52 111.018L76.9867 136L149 64"
												class="checkbox-tick"
											></path>
										</svg>
										<span class="label-text"></span>
									</label>
								</div>
								<h3 className="login-h3">Remember Me</h3>
							</div>
							<h3>
								<a href="" className="login-link">
									Forgot Password
								</a>
							</h3>
						</section>
					</form>
				</section>
				<div class="senzary_logo_container">
					<script
						type="module"
						src="https://unpkg.com/@splinetool/viewer@0.9.434/build/spline-viewer.js"
					></script>
					<spline-viewer
						loading-anim
						url="https://prod.spline.design/rZZVrKtTOwcdOWN7/scene.splinecode"
					></spline-viewer>
				</div>
			</section>
		</div>
	);
};

export default Login;
