import Header from '@/components/Shared/Header';
import Sidebar from '@/components/Shared/Sidebar';
import React from 'react'

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <Header />

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <Card
            title="Total Employees"
            value="128"
            color="text-blue-900"
          />
          <Card
            title="Transactions Today"
            value="$18,524"
            color="text-green-600"
          />
          <Card
            title="Pending Reports"
            value="5"
            color="text-red-600"
          /> */}
          {children}
        </div>

        {/* Table */}
        {/* <Table /> */}
      </main>
    </div>
        
    </div>
  )
}
