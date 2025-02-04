"use client";

import { useState } from "react";
import Header from "@/components/Shared/Header";
import Sidebar from "@/components/Shared/Sidebar";
import EmpDashboard from "@/components/Dashboard/EmpDashboard";
import Transactions from "@/components/Dashboard/Transactions";
import Customers from "@/components/Dashboard/Customers/Customers";
import Accounts from "@/components/Dashboard/Accounts/Accounts";
import Loans from "@/components/Dashboard/Loans/Loans";
import { AuthProvider } from "../context/AuthContext";


export default function DashboardLayout() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  console.log(activeComponent);

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <EmpDashboard />;
      case "Transactions":
        return <Transactions />;
      case "Customers":
        return <Customers />;
      case "Accounts":
        return <Accounts />;
      case "Loans":
        return <Loans />;
      
      default:
        return <EmpDashboard />;
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar with setActiveComponent function */}
      <AuthProvider>
      <Sidebar setActiveComponent={setActiveComponent} />

      </AuthProvider>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <AuthProvider>
        <Header />
        </AuthProvider>

        {/* Render Selected Component */}
        <div className="mt-4">{renderComponent()}</div>
      </main>
    </div>
  );
}
