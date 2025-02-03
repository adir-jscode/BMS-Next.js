"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Shared/loader";
import Table from "@/components/Shared/Table";
import { Plus } from "lucide-react";
import { getAccountDetails } from "@/app/services/getAccountDetails";
import Account from "@/app/types/Account";
import AddAccountModal, { AccountData } from "./AddAccountModal";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAccounts = async () => {
      setLoading(true);
      const data = await getAccountDetails(token);
      setAccounts(data);
      setLoading(false);
    };
    getAccounts();
  }, [token]);

  // Table Headers
  const columns = ["Account Number", "Account Type", "Balance", "Status", "Created At", "Updated At"];

  // Format accounts for the table
  const tableData = accounts.map((account) => ({
    "Account Number": account.accountNumber,
    "Account Type": account.accountType,
    Balance: `$${parseFloat(account.balance).toFixed(2)}`,
    Status: account.isActive ? "Active" : "Inactive",
    "Created At": new Date(account.createdAt).toLocaleString(),
    "Updated At": new Date(account.updatedAt).toLocaleString(),
  }));

  const handleSave = async (accountData: AccountData) => {
    const newAccount: Account = {
        ...accountData,
        id: accounts.length + 1, // Assuming id is generated this way
        balance: Number(accountData.initialDeposit).toFixed(2), // Convert to string with 2 decimal places
        isActive: true,
        createdAt: "",
        updatedAt: ""
    };
    console.log("Saving Account:", newAccount);
    // TODO: Add API call to save account
    setAccounts([...accounts, { ...newAccount, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-black font-bold">Accounts</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Account
        </button>
      </div>

      {loading ? <Loader /> : <Table columns={columns} data={tableData} />}

      {/* Add Account Modal */}
      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
};

export default Accounts;
