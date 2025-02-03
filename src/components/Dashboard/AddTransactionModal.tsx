"use client";

import Image from "next/image";
import React, { useState } from "react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transactionData: TransactionData) => Promise<void>;
}

export interface TransactionData {
  type: "deposit" | "withdrawal";
  amount: string;
  accountNumber: string;
  description: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [transaction, setTransaction] = useState<TransactionData>({
    type: "deposit",
    amount: "",
    accountNumber: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Handle Form Submission (API Call)
  const handleSubmit = async () => {
    if (!transaction.type || !transaction.amount || !transaction.accountNumber || !transaction.description) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: transaction.type,
          amount: Number(transaction.amount), // Convert to number
          accountNumber: transaction.accountNumber,
          description: transaction.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      alert("Transaction successful!");
      onSave(transaction);
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
         {/* Left Section - Image */}
         <Image src="/assets/images/transaction_modal.jpg" height={400} width={800} alt="account" />
               
        <h3 className="text-xl font-semibold mb-4 text-gray-800">New Transaction</h3>
        <div className="flex flex-col gap-3">
          <select name="type" className="input text-black input-bordered" onChange={handleChange} value={transaction.type}>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
          <input type="number" name="amount" placeholder="Amount" className="input text-black input-bordered" onChange={handleChange} value={transaction.amount} />
          <input type="text" name="accountNumber" placeholder="Account Number" className="input text-black input-bordered" onChange={handleChange} value={transaction.accountNumber} />
          <input type="text" name="description" placeholder="Description" className="input text-black input-bordered" onChange={handleChange} value={transaction.description} />
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

export default AddTransactionModal;
