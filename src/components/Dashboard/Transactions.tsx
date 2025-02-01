"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { fetchUserTransactions } from "@/app/services/fetchUserTransactions";


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
    const getTransactions = async () => {
      setLoading(true);
      const data = await fetchUserTransactions(token);
      setTransactions(data);
      setLoading(false);
    };

    getTransactions();
  }, [token]);

  // Table Headers
  const columns = [
    "Type",
    "Amount",
    "Account Number",
    "Account Type",
    "Balance",
    "Description",
    "Transactions At",
    "Account Created At",
    "Account Updated At",
  ];

  // Format transactions for the table
  const tableData = transactions.map((transaction) => ({
    Type: transaction.type,
    Amount: `$${transaction.amount}`,
    "Account Number": transaction.account.accountNumber,
    "Account Type": transaction.account.accountType,
    Balance: `$${transaction.account.balance}`,
    Description: transaction.description || "N/A",
    "Transactions At": new Date(transaction.createdAt).toLocaleString(),
    "Account Created At": new Date(transaction.account.createdAt).toLocaleString(),
    "Account Updated At": new Date(transaction.account.updatedAt).toLocaleString(),
  }));

  return (
    <div className="p-6  text- h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">Transactions</h2>
      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}
    </div>
  );
};

export default Transactions;
