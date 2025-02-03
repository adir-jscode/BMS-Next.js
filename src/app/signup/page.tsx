"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "@/components/Shared/loader";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    uniqueId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    // Validate if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const { ...signupData } = formData; // Remove confirmPassword before sending

      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //re
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.message || "An unexpected error occurred.",
        });
        setLoading(false);
        return;
      }

      // Success message and redirect to login
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Your account has been created!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-100">
      <div className="container bg-base-100 px-6 sm:px-12 md:px-24 mx-auto py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start rounded-lg overflow-hidden">
            <Image
              src="/assets/images/signup.jpg"
              height={540}
              width={540}
              alt="Signup"
            />
          </div>
          <div className="border-2 p-8 sm:p-12 md:p-16">
            <h6 className="text-3xl font-semibold text-blue-500 text-center mb-6 md:mb-12">
              Create Your Account
            </h6>
            <form onSubmit={handleSubmit}>
              <label className="text-black font-bold" htmlFor="uniqueId">
                Employee ID
              </label>
              <input
                type="text"
                name="uniqueId"
                value={formData.uniqueId}
                onChange={handleChange}
                placeholder="EMP-XXX"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              <label className="text-black font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              <label className="text-black font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              <label className="text-black font-bold" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              <label className="text-black font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              <label className="text-black font-bold" htmlFor="confirmPassword">
                Re-type Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type your password"
                className="mt-3 w-full input input-bordered text-black"
                required
              />
              <br /> <br />

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
                {loading && <Loader />}
              </button>
            </form>

            {/* login link */}
            <p className="mt-4 text-black font-bold text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
