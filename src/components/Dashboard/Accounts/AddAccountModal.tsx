"use client";

import Image from "next/image";
import React, { useState } from "react";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (accountData: AccountData) => Promise<void>;
}

export interface AccountData {
  accountNumber: string;
  accountType: string;
  initialDeposit: string;
  customerId: string;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onSave }) => {
  const [account, setAccount] = useState<AccountData>({
    accountNumber: "",
    accountType: "",
    initialDeposit: "",
    customerId: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  // Handle Form Submission (API Call)
  const handleSubmit = async () => {
    if (!account.accountNumber || !account.accountType || !account.initialDeposit || !account.customerId) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountNumber: account.accountNumber,
          accountType: account.accountType,
          initialDeposit: Number(account.initialDeposit), // Convert to number
          customerId: Number(account.customerId), // Convert to number
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      alert("Account created successfully!");
      onSave(account);
      onClose();
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
          <Image src="/assets/images/account.jpg" height={900} width={800} alt="account" />
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Account</h3>
          <div className="flex flex-col gap-3">
            <input type="text" name="accountNumber" placeholder="Account Number" className="input text-black input-bordered" onChange={handleChange} value={account.accountNumber} />
            <select name="accountType" className="input text-black input-bordered" onChange={handleChange} value={account.accountType}>
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
            </select>
            <input type="number" name="initialDeposit" placeholder="Initial Deposit" className="input text-black input-bordered" onChange={handleChange} value={account.initialDeposit} />
            <input type="number" name="customerId" placeholder="Customer ID" className="input text-black input-bordered" onChange={handleChange} value={account.customerId} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;
