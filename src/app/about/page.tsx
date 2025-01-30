import Image from 'next/image';
import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero flex flex-col lg:flex-row items-center px-6 py-16 lg:py-32">
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Efficient & Reliable Employee Management
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to our Bank Management System (BMS) – a cutting-edge platform designed to streamline employee operations, enhance productivity, and ensure secure and reliable management of banking processes.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With years of expertise in banking software, we provide tailored solutions that empower employees to efficiently manage tasks, customer interactions, and banking services while maintaining the highest standards of data security.
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
          <Image
            width={1000}
            height={1000}
            src="/assets/images/work.jpg"
            alt="Team collaboration"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 bg-base-200">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-primary mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Employee Account Management</h3>
                <p className="text-black-600">Streamlined employee and user management system for easy access and control.</p>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Transaction Monitoring</h3>
                <p className="text-gray-600">Secure real-time monitoring of all financial transactions for better compliance.</p>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Data Security</h3>
                <p className="text-gray-600">High standards of security to protect sensitive banking data and transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-primary mb-6">Our Dedicated Team</h2>
          <p className="text-lg text-gray-600 mb-12">
            Our team of experts is committed to creating the best banking solutions for employees. With a passion for technology and a focus on security, we work together to deliver state-of-the-art systems for modern banking needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="card bg-base-200 shadow-lg">
              <figure>
                <Image
                  src="/assets/images/member1.jpg"
                  alt="Team Member 1"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">John Doe</h3>
                <p className="text-gray-700">Lead Developer</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <figure>
                <Image
                  src="/assets/images/member2.jpg"
                  alt="Team Member 2"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-700">Project Manager</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <figure>
                <Image
                  src="/assets/images/member3.jpg"
                  alt="Team Member 3"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">Alice Johnson</h3>
                <p className="text-gray-700">UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
