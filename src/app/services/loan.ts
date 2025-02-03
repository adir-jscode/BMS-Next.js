export interface Loan {
    id: number;
    loanType: string;
    amount: string;
    interestRate: string;
    startDate: string;
    endDate: string;
    balance: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    account: {
      id: number;
      accountNumber: string;
      accountType: string;
      balance: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    customer: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      address: string;
      createdAt: string;
      updatedAt: string;
    };
  }
  
  export default Loan;
  