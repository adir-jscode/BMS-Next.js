"use client"

import Image from "next/image";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your form submission logic here (e.g., send data to API)
    alert('Your message has been sent!');
  };

  return (
    <div className="hero min-h-screen bg-base-100 text-slate-800">
      <div className="hero-content flex-col lg:flex-row">
        {/* Left Section with Image */}
        <div className="lg:w-1/2">
          <Image
            src="/assets/images/contact.jpg"
            alt="Contact Us"
            width={1000}
            height={1000}
            className="w-3/4 rounded-lg"
          />
        </div>

        {/* Right Section with Form */}
        <div className="lg:w-1/2 p-6 space-y-5">
          <h1 className="text-5xl font-bold text-blue-600">Contact Us</h1>
          <p className="py-6">We’d love to hear from you! Fill out the form below to get in touch.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full input input-bordered"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full input input-bordered"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-bold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full input input-bordered"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
