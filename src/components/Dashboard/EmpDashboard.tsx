"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchUserTransactions } from "@/app/services/fetchUserTransactions";
import { getCustomersDetails } from "@/app/services/getCustomersDetails";
import { Wallet, Users } from "lucide-react";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const EmpDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const transactionData = await fetchUserTransactions(token);
      setTransactions(transactionData);

      const customerData = await getCustomersDetails(token);
      setTotalCustomers(customerData.length);
    };

    getData();
  }, [token]);

  // Process data for Chart
  const chartData = {
    labels: transactions.map((t) => new Date(t.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Transaction Amount ($)",
        data: transactions.map((t) => t.amount),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="p-6  text-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-6">Employee Dashboard</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Total Transactions */}
        <div className="card bg-blue-700 text-white shadow-lg p-6 flex flex-row items-center gap-4 rounded-lg">
          <Wallet size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Transactions</h3>
            <p className="text-xl">{transactions.length}</p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="card bg-green-700 text-white shadow-lg p-6 flex flex-row items-center gap-4 rounded-lg">
          <Users size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <p className="text-xl">{totalCustomers}</p>
          </div>
        </div>

        {/* Total Active Loans */}
        {/* <div className="card bg-red-700 text-white shadow-lg p-6 flex flex-row items-center gap-4 rounded-lg">
          <Briefcase size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Active Loans</h3>
            <p className="text-xl">{totalActiveLoans}</p>
          </div>
        </div> */}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Transactions Overview</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default EmpDashboard;
