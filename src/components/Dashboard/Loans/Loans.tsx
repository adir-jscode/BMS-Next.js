"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { Plus } from "lucide-react";
import { fetchLoans } from "@/app/services/fetchLoans";
import Loan from "@/app/services/loan";
import AddLoanModal, { LoanData } from "./AddLoanModal";

const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getLoans = async () => {
      setLoading(true);
      const data = await fetchLoans(token);
      setLoans(data);
      setLoading(false);
    };
    getLoans();
  }, [token]);

  // Table Headers
  const columns = [
    "Loan Type",
    "Amount",
    "Interest Rate",
    "Start Date",
    "End Date",
    "Balance",
    "Account Number",
    "Customer",
    "Loan Created At",
  ];

  // Format loans for the table
  const tableData = loans.map((loan) => ({
    "Loan Type": loan.loanType,
    Amount: `$${loan.amount}`,
    "Interest Rate": `${loan.interestRate}%`,
    "Start Date": new Date(loan.startDate).toLocaleDateString(),
    "End Date": new Date(loan.endDate).toLocaleDateString(),
    Balance: `$${loan.balance}`,
    "Account Number": loan.account.accountNumber,
    Customer: `${loan.customer.firstName} ${loan.customer.lastName}`,
    "Loan Created At": new Date(loan.createdAt).toLocaleString(),
  }));

  const handleSave = async (loanData: LoanData) => {
    const newLoan: Loan = {
      id: Date.now(), // Generate unique ID
      loanType: loanData.loanType,
      amount: loanData.amount,
      interestRate: loanData.interestRate,
      startDate: loanData.startDate,
      endDate: loanData.endDate,
      balance: loanData.amount, // Initially, balance is the loan amount
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      account: {
        id: 0, // Placeholder since we don't have a real ID
        accountNumber: loanData.accountNumber,
        accountType: "Unknown", // Placeholder
        balance: "0", // Placeholder
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      customer: {
        id: Number(loanData.customerId),
        firstName: "Unknown", // Placeholder
        lastName: "Unknown", // Placeholder
        email: "unknown@example.com",
        phoneNumber: "N/A",
        address: "N/A",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  
    setLoans([...loans, newLoan]);
  };
  
  

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-black font-bold">Loans</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Loan
        </button>
      </div>

      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}

      {/* Add Loan Modal */}
      <AddLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default Loans;
