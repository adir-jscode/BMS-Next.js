"use client";

import { useState } from "react";
import Header from "@/components/Shared/Header";
import Sidebar from "@/components/Shared/Sidebar";
import EmpDashboard from "@/components/Dashboard/EmpDashboard";
import Transactions from "@/components/Dashboard/Transactions";
import Customers from "@/components/Dashboard/Customers/Customers";



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
      default:
        return <EmpDashboard />;
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar with setActiveComponent function */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <Header />

        {/* Render Selected Component */}
        <div className="mt-4">{renderComponent()}</div>
      </main>
    </div>
  );
}
