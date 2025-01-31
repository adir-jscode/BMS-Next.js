"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";

interface Transaction {
  id: string;
  type: string;
  amount: string;
  description: string;
  createdAt: string;
  account: {
    id: string;
    accountNumber: string;
    accountType: string;
    balance: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
        console.log("data in transactions page = ", data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="table w-full text-sm">
            {/* Table Header */}
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Account Number</th>
                <th className="p-2">Account Type</th>
                <th className="p-2">Balance</th>
                <th className="p-2">Description</th>
                <th className="p-2">Transactions At</th>
                <th className="p-2">Account Created At</th>
                <th className="p-2">Account Updated At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-gray-800">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700">
                    <td className="p-2">{transaction.type}</td>
                    <td className="p-2">${transaction.amount}</td>
                    <td className="p-2">{transaction.account.accountNumber}</td>
                    <td className="p-2">{transaction.account.accountType}</td>
                    <td className="p-2">${transaction.account.balance}</td>
                    <td className="p-2">{transaction.description || "N/A"}</td>
                    <td className="p-2">{new Date(transaction.createdAt).toLocaleString()}</td>
                    <td className="p-2">{new Date(transaction.account.createdAt).toLocaleString()}</td>
                    <td className="p-2">{new Date(transaction.account.updatedAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 p-4">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
