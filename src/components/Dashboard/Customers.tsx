"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { getCustomersDetails } from "@/app/services/getCustomersDetails";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      const data = await getCustomersDetails(token);
      console.log(data);
      setCustomers(data);
      setLoading(false);
    };

    getCustomers();
  }, [token]);

  // Table Headers
  const columns = ["First Name", "Last Name", "Email", "Phone Number", "Address", "Created At", "Updated At"];

  // Format customers for the table
  const tableData = customers.map((customer) => ({
    "First Name": customer.firstName,
    "Last Name": customer.lastName,
    Email: customer.email,
    "Phone Number": customer.phoneNumber,
    Address: customer.address,
    "Created At": new Date(customer.createdAt).toLocaleString(),
    "Updated At": new Date(customer.updatedAt).toLocaleString(),
  }));

  return (
    <div className="p-6  text- h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">Customers</h2>
      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}
    </div>
  );
};

export default Customers;
