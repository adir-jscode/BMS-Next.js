import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Contact = () => {
  return (
    <div className="bg-base-100 p-12 text-slate-800 rounded-lg shadow-xl flex items-center justify-between space-x-8">
      {/* Left Section with Text Content */}
      <div className="space-y-6 w-1/2">
        <h3 className="text-3xl text-blue-600 font-semibold">Get in Touch</h3>
        <p className="text-lg">
          We’re here to assist you with any questions or concerns. Reach out to our support team for more information or inquiries. Our team is always ready to help!
        </p>
        <p className="text-md">
          For any inquiries or support requests, feel free to reach us via email or phone. We aim to respond as quickly as possible to all queries.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="text-blue-600"
            >
              <path d="M12 2L2 12l10 10 10-10-10-10z" />
            </svg>
            <p className="text-lg">support@bank.com</p>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="text-blue-600"
            >
              <path d="M12 2L2 12l10 10 10-10-10-10z" />
            </svg>
            <p className="text-lg">+1 234 567 890</p>
          </div>
        </div>
        <br></br>
        <Link href="/contact">
          <button className="btn btn-primary">Contact Us</button>
        </Link>
      </div>

      {/* Right Section with Image */}
      <div className="w-1/2">
        <Image
          src="/assets/images/contact.jpg" // Replace with your actual image path
          alt="Contact Us"
          width={500}
          height={300}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Contact;
