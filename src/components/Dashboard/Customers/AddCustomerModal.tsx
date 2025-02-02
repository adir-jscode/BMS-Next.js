"use client";

import Image from "next/image";
import React, { useState } from "react";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: CustomerData) => Promise<void>;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [customer, setCustomer] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle Form Submission (API Call)
  const handleSubmit = async () => {
    if (!customer.firstName || !customer.lastName || !customer.email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passing token in the header
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      alert("Customer added successfully!");
      onSave(customer); // Update the list of customers
      onClose(); // Close modal after saving
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] flex">
        {/* Left Section - Image */}
        <div className="w-1/2 flex items-center justify-center p-4 rounded-l-lg">
          <Image src="/assets/images/customer.jpg" height={900} width={800} alt="customer" />
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Customer</h3>
          <div className="flex flex-col gap-3">
            <input type="text" name="firstName" placeholder="First Name" className="input text-black input-bordered" onChange={handleChange} value={customer.firstName} />
            <input type="text" name="lastName" placeholder="Last Name" className="input text-black input-bordered" onChange={handleChange} value={customer.lastName} />
            <input type="email" name="email" placeholder="Email" className="input text-black input-bordered" onChange={handleChange} value={customer.email} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" className="input text-black input-bordered" onChange={handleChange} value={customer.phoneNumber} />
            <input type="text" name="address" placeholder="Address" className="input text-black input-bordered" onChange={handleChange} value={customer.address} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
