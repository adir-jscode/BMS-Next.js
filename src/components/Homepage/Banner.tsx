import React from "react";

const Banner = () => {
  return (
    <div className="container mx-auto text-white">
      <div className="carousel w-full">
        {banners.map((banner, index) => (
          <div
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(7,25,82,0.8), rgba(0,0,0,0.5)), url(/assets/images/banner/${index + 1}.jpg)`,
            }}
            key={index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full bg-center bg-no-repeat h-[90vh]"
          >
            <div className="h-full w-full flex items-center px-12 lg:px-36">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold">{banner.title}</h1>
                <p className="text-lg">{banner.description}</p>
                <button className="btn btn-primary mr-4">Learn More</button>
                <button className="btn btn-outline text-white">Our Services</button>
              </div>
            </div>
            <div className="absolute flex justify-between transform bottom-12 right-12">
              <a href={banner.prev} className="btn btn-circle mr-6">
                ❮
              </a>
              <a href={banner.next} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const banners = [
  {
    title: "Empowering Bank Employees with Modern Solutions",
    description:
      "Our Bank Management System enhances employee productivity, ensures security, and streamlines banking operations for a seamless experience.",
    next: "#slide2",
    prev: "#slide4",
  },
  {
    title: "Innovative Banking Software for Employees",
    description:
      "Experience a next-generation platform designed for efficient employee management and secure banking transactions.",
    next: "#slide3",
    prev: "#slide1",
  },
  {
    title: "Maximize Efficiency with Our BMS Platform",
    description:
      "Our system is equipped with powerful tools to simplify daily operations, improve workflows, and optimize performance.",
    next: "#slide4",
    prev: "#slide2",
  },
  {
    title: "Reliable & Secure Solutions for Banking Professionals",
    description:
      "We prioritize security and reliability, ensuring employees and customers benefit from top-notch banking services.",
    next: "#slide1",
    prev: "#slide3",
  },
];

export default Banner;
