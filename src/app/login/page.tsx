"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(null); // Reset previous errors

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send and receive cookies
        body: JSON.stringify({ uniqueId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to dashboard on success
      router.push("/employee-dashboard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="bg-base-100">
      <div className="container bg-base-100 px-6 sm:px-12 md:px-24 mx-auto py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/assets/images/login.png"
              height={340}
              width={340}
              alt="login image"
            />
          </div>
          <div className="border-2 p-8 sm:p-12 md:p-16">
            <h6 className="text-3xl font-semibold text-blue-500 text-center mb-6 md:mb-12">
              Welcome Back
            </h6>
            <form onSubmit={handleSubmit}>
              <label className="text-black font-bold" htmlFor="uniqueId">
                ID
              </label>
              <input
                type="text"
                name="uniqueId"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                placeholder="Your employee ID"
                className="mt-3 w-full input input-bordered text-black"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full mt-3 input input-bordered text-black"
                required
              />
              <br /> <br />
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
