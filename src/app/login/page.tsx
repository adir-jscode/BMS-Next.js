"use client";
import Image from "next/image";
import React  from "react";

const Page = () => {
  

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
            <form  action="">
            <label className="text-black font-bold" htmlFor="email">ID</label>

              <input
                type="text"
                name="email"
                placeholder="your employee ID"
                className="mt-3 w-full input input-bordered"
              />
              <br /> <br />
              <label className="text-black font-bold" htmlFor="password">Password</label> <br />
              <input
                type="password"
                name="password"
                placeholder="your password"
                className="w-full mt-3 input input-bordered"
              />
                <br /> <br />
                <button className="btn btn-primary w-full">Login</button>
            </form>
            <div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;