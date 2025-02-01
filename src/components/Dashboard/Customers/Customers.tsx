"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { getCustomersDetails } from "@/app/services/getCustomersDetails";
import { Plus } from "lucide-react";
import Customer from "@/app/types/Customer";
import AddCustomerModal, { CustomerData } from "./AddCustomerModal";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      const data = await getCustomersDetails(token);
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

  const handleSave = async (customerData: CustomerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: customers.length + 1, // Assuming id is generated this way
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log("Saving Customer:", newCustomer);
    console.log("Saving Customer:", newCustomer);
    // TODO: Add API call to save customer
    setCustomers([...customers, { ...newCustomer, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-black font-bold">Customers</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}

      {/* Add Customer Modal */}
      <AddCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default Customers;
