"use client";

import React, { useState } from "react";

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loanData: LoanData) => Promise<void>;
}

export interface LoanData {
  loanType: string;
  amount: string;
  interestRate: string;
  startDate: string;
  endDate: string;
  accountNumber: string;
  customerId: string;
}

const AddLoanModal: React.FC<AddLoanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [loan, setLoan] = useState<LoanData>({
    loanType: "",
    amount: "",
    interestRate: "",
    startDate: "",
    endDate: "",
    accountNumber: "",
    customerId: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  // Handle Form Submission (API Call)
  const handleSubmit = async () => {
    if (!loan.loanType || !loan.amount || !loan.interestRate || !loan.startDate || !loan.endDate || !loan.accountNumber || !loan.customerId) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          loanType: loan.loanType,
          amount: Number(loan.amount),
          interestRate: Number(loan.interestRate),
          startDate: new Date(loan.startDate).toISOString(),
          endDate: new Date(loan.endDate).toISOString(),
          accountNumber: loan.accountNumber,
          customerId: Number(loan.customerId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create loan");
      }

      alert("Loan added successfully!");
      onSave(loan);
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">New Loan</h3>
        <div className="flex flex-col gap-3">
          <select name="loanType" className="input text-black input-bordered" onChange={handleChange} value={loan.loanType}>
            <option value="">Select Loan Type</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
          </select>
          <input type="number" name="amount" placeholder="Amount" className="input text-black input-bordered" onChange={handleChange} value={loan.amount} />
          <input type="number" step="0.01" name="interestRate" placeholder="Interest Rate (%)" className="input text-black input-bordered" onChange={handleChange} value={loan.interestRate} />
          <input type="date" name="startDate" className="input text-black input-bordered" onChange={handleChange} value={loan.startDate} />
          <input type="date" name="endDate" className="input text-black input-bordered" onChange={handleChange} value={loan.endDate} />
          <input type="text" name="accountNumber" placeholder="Account Number" className="input text-black input-bordered" onChange={handleChange} value={loan.accountNumber} />
          <input type="number" name="customerId" placeholder="Customer ID" className="input text-black input-bordered" onChange={handleChange} value={loan.customerId} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLoanModal;
