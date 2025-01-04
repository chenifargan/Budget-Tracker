import React from "react";
import { useTransaction } from "../Context/TransactionContext";

export const ByCategory = () => {
  const { transactions } = useTransaction();
  const totalByCategory = transactions.reduce<{ [key: string]: number }>(
    (acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    },
    {}
  );
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-black text-left">
        Expenses by Category
      </h2>
      {Object.keys(totalByCategory).length > 0 ? (
        <div className="flex flex-col bg-white rounded-lg shadow-md">
          {Object.entries(totalByCategory).map(([category, total], index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4  "
            >
              <p className="font-bold text-black">{category}</p>
              <p className="text-sm text-black">₪{total}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-left">No expenses recorded.</p>
      )}
    </div>
  );
};
