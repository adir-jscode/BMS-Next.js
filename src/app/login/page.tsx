"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({ uniqueId: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        const { message } = await response.json();
        console.log(message);
        setError(message || "Login failed. Please try again.");
        return;
      }

      const { accessToken } = await response.json();

      // Save accessToken to localStorage or cookies
      localStorage.setItem("accessToken", accessToken);

      // Redirect user to the dashboard or homepage
      router.push("/dashboard");
    } catch (err) {
      setError(`An error occurred while logging in. Please try again.${err}`);
    }
  };

  return (
    <div className="container bg-base-100 px-24 mx-auto py-24">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/assets/images/login.png"
            height="340"
            width="340"
            alt="login image"
          />
        </div>
        <div className="border-2 p-12">
          <h6 className="text-3xl font-semibold text-blue-500 text-center mb-12">
            Welcome Back
          </h6>
          <form onSubmit={handleSubmit}>
            <label className="text-black font-bold" htmlFor="uniqueId">
              ID
            </label>
            <input
              type="text"
              name="uniqueId"
              value={formData.uniqueId}
              onChange={handleInputChange}
              placeholder="Your employee ID"
              className="mt-3 w-full input input-bordered"
              required
            />
            <br /> <br />
            <label className="text-black font-bold" htmlFor="password">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Your password"
              className="w-full mt-3 input input-bordered"
              required
            />
            <br /> <br />
            <button className="btn btn-primary w-full">Login</button>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
