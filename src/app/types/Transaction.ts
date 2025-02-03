interface Transaction {
  id: number;
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

export default Transaction;