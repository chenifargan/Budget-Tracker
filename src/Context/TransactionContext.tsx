import React, { createContext, useState, ReactNode } from "react";
import { TransactionModel } from "../Model/TransactionModel";
interface TransactionContextType {
  transactions: TransactionModel[];
  addTransaction: (transaction: TransactionModel) => void;
  removeTransaction: (id: string, category: string, amount: number) => void;
  setTransactionToEdit: (transaction: TransactionModel) => void;
  editTransaction: TransactionModel | null;
  updateTransaction: (updatedTransaction: TransactionModel) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);
interface TransactionProviderProps {
  children: ReactNode;
}
export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [editTransaction, setEditTransaction] =
    useState<TransactionModel | null>(null); // כאן נשמור את הטרנזקציה שנבחרה לעריכה

  const addTransaction = (transaction: TransactionModel) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };
  const removeTransaction = (id: string, category: string, amount: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction) =>
          transaction.id !== id ||
          transaction.category !== category ||
          transaction.amount !== amount
      )
    );
  };
  const setTransactionToEdit = (transaction: TransactionModel) => {
    setEditTransaction(transaction); // עדכון הטרנזקציה לעריכה
  };
  const updateTransaction = (updatedTransaction: TransactionModel) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id &&
        transaction.amount === updatedTransaction.amount
          ? { ...transaction, description: updatedTransaction.description }
          : transaction
      )
    );
    setEditTransaction(null);
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        setTransactionToEdit,
        editTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = React.useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
