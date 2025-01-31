"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef } from "ag-grid-community";
import { 
    ClientSideRowModelModule 
  } from "@ag-grid-community/client-side-row-model";
  import { 
    ModuleRegistry 
  } from "@ag-grid-community/core";
  import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
  ModuleRegistry.registerModules([ClientSideRowModelModule]);


interface Transaction {
  _id: string;
  type: string;
  amount: number;
  accountNumber: string;
  description: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
        console.log("data in transactions = ",data);    
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // AG Grid column definitions

  const columnDefs: ColDef[] = [
    { headerName: "Type", field: "type", filter: true, sortable: true },
    { headerName: "Amount", field: "amount", filter: true, sortable: true },
    { headerName: "Account Number", field: "accountNumber", filter: true },
    { headerName: "Description", field: "description" },
  ];

  return (
    <div className="p-4 bg-black shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {/* map transaction */}
    
    
      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : (
        <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
          <AgGridReact
            rowData={transactions}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>
      )}
    </div>
  );
};

export default Transactions;
