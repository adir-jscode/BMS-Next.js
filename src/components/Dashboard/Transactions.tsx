"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { fetchUserTransactions } from "@/app/services/fetchUserTransactions";
import Transaction from "@/app/types/Transaction";
import AddTransactionModal, { TransactionData } from "./AddTransactionModal";
import { Plus, Download } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const columns = ["Type", "Amount", "Account Number", "Description", "Transaction At"];

  // Format transactions for the table
  const tableData = transactions.map((transaction) => ({
    Type: transaction.type,
    Amount: `$${transaction.amount}`,
    "Account Number": transaction.account.accountNumber,
    Description: transaction.description || "N/A",
    "Transaction At": new Date(transaction.createdAt).toLocaleString(),
  }));

  const handleSave = async (transactionData: TransactionData) => {
    setTransactions([
      ...transactions,
      {
        ...transactionData,
        id: transactions.length + 1,
        account: {
          id: "",
          accountNumber: transactionData.accountNumber,
          accountType: "",
          balance: "",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // 📌 Handle Report Download & Open in New Tab
  const handleDownloadReport = async () => {
    try {
      const response = await fetch("http://localhost:5000/reports/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");

      // Create download link
      const a = document.createElement("a");
      a.href = url;
      a.download = "transaction-report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-black font-bold">Transactions</h2>
        <div className="flex gap-3">
          {/* New Transaction Button */}
          <button className="btn btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            New Transaction
          </button>

          {/* Download Report Button */}
          <button className="btn btn-secondary flex items-center gap-2" onClick={handleDownloadReport}>
            <Download size={18} />
            Download Report
          </button>
        </div>
      </div>

      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default Transactions;
