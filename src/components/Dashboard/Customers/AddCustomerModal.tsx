"use client";

import Image from "next/image";
import React, { useState } from "react";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: CustomerData) => void;
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

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = () => {
    if (!customer.firstName || !customer.lastName || !customer.email) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave(customer);
    onClose(); // Close modal after save
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] flex">
        {/* Left Section - Image */}
        <div className="w-1/2  flex items-center justify-center p-4 rounded-l-lg">
         <Image
                       src="/assets/images/customer.jpg"
                       height={900}
                       width={800}
                       alt="customer"
                     />
        </div>

        {/* Right Section - Form */}
        <div className="w-2/3 p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Customer</h3>
          <div className="flex flex-col gap-3">
            <input type="text" name="firstName" placeholder="First Name" className="input input-bordered" onChange={handleChange} value={customer.firstName} />
            <input type="text" name="lastName" placeholder="Last Name" className="input input-bordered" onChange={handleChange} value={customer.lastName} />
            <input type="email" name="email" placeholder="Email" className="input input-bordered" onChange={handleChange} value={customer.email} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" className="input input-bordered" onChange={handleChange} value={customer.phoneNumber} />
            <input type="text" name="address" placeholder="Address" className="input input-bordered" onChange={handleChange} value={customer.address} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
