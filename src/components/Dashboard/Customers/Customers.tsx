"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { Plus, Edit, Trash } from "lucide-react";
import Customer from "@/app/types/Customer";
import AddCustomerModal, { CustomerData } from "./AddCustomerModal";
import { getCustomersDetails } from "@/app/services/getCustomersDetails";
import { updateCustomer } from "@/app/services/updateCustomer";
import { deleteCustomer } from "@/app/services/deleteCustomer";
import ConfirmationModal from "./ConfirmationModal";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const data = await getCustomersDetails(token);
      setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, [token]);

  // Table Headers
  const columns = ["First Name", "Last Name", "Email", "Phone Number", "Address", "Created At", "Updated At", "Actions"];

  const tableData = customers.map((customer) => ({
    "First Name": customer.firstName,
    "Last Name": customer.lastName,
    Email: customer.email,
    "Phone Number": customer.phoneNumber,
    Address: customer.address,
    "Created At": new Date(customer.createdAt).toLocaleString(),
    "Updated At": new Date(customer.updatedAt).toLocaleString(),
    Actions: (
      <div className="flex gap-2">
        <button
          className="btn btn-warning"
          onClick={() => {
            setSelectedCustomer(customer);
            setIsEditModalOpen(true);
          }}
        >
          <Edit size={16} />
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setSelectedCustomer(customer);
            setIsDeleteModalOpen(true);
          }}
        >
          <Trash size={16} />
        </button>
      </div>
    ),
  }));

  // Handle Add Customer
  const handleSave = async (customerData: CustomerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: customers.length + 1, // Assuming ID is generated this way
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // TODO: Add API call to save customer
    setCustomers([...customers, newCustomer]);
  };

  // Handle Update Customer
  const handleUpdate = async (customerData: CustomerData) => {
    if (!selectedCustomer) return;

    try {
      const updatedCustomer = await updateCustomer(selectedCustomer.id, customerData, token);
      setCustomers(customers.map((cust) => (cust.id === updatedCustomer.id ? updatedCustomer : cust)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Handle Delete Customer
  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await deleteCustomer(selectedCustomer.id, token);
      setCustomers(customers.filter((cust) => cust.id !== selectedCustomer.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-black font-bold">Customers</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}

      {/* Add Customer Modal */}
      <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave} />

      {/* Edit Customer Modal */}
      {selectedCustomer && (
        <AddCustomerModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdate}
          initialData={selectedCustomer} // Prefill data for update
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}?`}
      />
    </div>
  );
};

export default Customers;
