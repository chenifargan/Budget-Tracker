import React from "react";
import { useTransaction } from "../Context/TransactionContext";
import { TransactionModel } from "../Model/TransactionModel";

export const Transaction = () => {
  const { transactions, removeTransaction, setTransactionToEdit } =
    useTransaction();
  const handleEditClick = (transaction: TransactionModel) => {
    setTransactionToEdit(transaction); // עדכון ה-context עם הטרנזקציה לעריכה
  };
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-black text-left">
        Transactions
      </h2>
      {transactions.length > 0 && (
        <div className="flex flex-col">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                transaction.type === "Expense" ? "bg-red-200" : "bg-green-200"
              }`}
            >
              {/* Details */}
              <div>
                <p className="font-bold text-black">
                  {transaction.description}
                </p>
                <p className="text-sm">
                  {transaction.category} - {transaction.date}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="font-bold text-black">{transaction.amount}₪</p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  onClick={() => handleEditClick(transaction)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() =>
                    removeTransaction(
                      transaction.id,
                      transaction.category,
                      transaction.amount
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
