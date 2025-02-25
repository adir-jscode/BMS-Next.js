"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "@/components/Shared/loader";
import { useAuth } from "../context/AuthContext";

const Page = () => {
  const { login } = useAuth();
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ uniqueId, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire({ icon: "error", title: "Login Failed", text: data.message || "Invalid credentials." });
        setLoading(false);
        return;
      }

      const token = data.accessToken;
      if (token) {
        await login(token); // Fetch user data and store globally
      }

      Swal.fire({ icon: "success", title: "Login Successful", text: "Redirecting to dashboard...", timer: 1500, showConfirmButton: false })
        .then(() => router.push("/employee-dashboard"));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-100">
      <div className="container bg-base-100 px-6 sm:px-12 md:px-24 mx-auto py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <Image src="/assets/images/login.png" height={340} width={340} alt="login image" />
          </div>
          <div className="border-2 p-8 sm:p-12 md:p-16">
            <h6 className="text-3xl font-semibold text-blue-500 text-center mb-6 md:mb-12">Welcome Back</h6>
            <form onSubmit={handleSubmit}>
              <label className="text-black font-bold" htmlFor="uniqueId">ID</label>
              <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} className="mt-3 w-full input input-bordered text-black" required />
              <br /><br />
              <label className="text-black font-bold" htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 input input-bordered text-black" required />
              <br /><br />
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"} {loading && <Loader />}
              </button>
            </form>
            <p className="mt-4 text-black font-bold text-center">
              Join as Employee <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
            </p>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
