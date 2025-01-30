import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={"/assets/images/bank.png"}
          alt="Banking services image"
            width={1000}
            height={1000}
          className="max-w-sm rounded-lg"
        />
        <div>
          <h1 className="text-5xl font-bold text-primary">
            Empowering Your Banking Experience
          </h1>
          <p className="py-6 text-lg ">
            Enhance your banking operations with our advanced Bank Management System. Our platform
            offers seamless management of accounts, transactions, and customer services, all designed
            for optimal efficiency and security.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
