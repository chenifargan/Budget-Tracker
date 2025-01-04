import React, { useEffect, useState } from "react";
import { TransactionModel } from "../Model/TransactionModel";
import { useTransaction } from "../Context/TransactionContext";
export const AddBudget = () => {
  const [transactionType, setTransactionType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const {
    addTransaction,
    editTransaction,

    updateTransaction,
  } = useTransaction();
  useEffect(() => {
    if (editTransaction) {
      setTransactionType(editTransaction.type);
      setCategory(editTransaction.category);
      setAmount(editTransaction.amount.toString());
      setDescription(editTransaction.description);
      setDate(editTransaction.date);
    }
  }, [editTransaction]);
  const handleBudget = (event: React.FormEvent) => {
    event.preventDefault();
    if (!transactionType || !category || !amount || !description || !date) {
      alert("All fields are required!");
      return;
    }
    const newTransaction: TransactionModel = {
      id: `${Date.now().toLocaleString}`,
      amount: parseInt(amount),
      type: transactionType,
      category,
      description,
      date,
    };
    if (editTransaction) {
      // אם יש טרנזקציה לעריכה, נעדכן אותה בקונטקסט
      updateTransaction(newTransaction);
    } else {
      // אחרת, ניצור טרנזקציה חדשה
      addTransaction(newTransaction);
    }

    alert("Transaction saved successfully");
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full max-w-2xl">
      <form className="w-full" onSubmit={handleBudget}>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-bold text-gray-700 "
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  text-black"
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-bold text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            placeholder="e.g., Food, Travel"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-bold text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  text-black"
            placeholder="e.g., 100"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  text-black"
            placeholder="e.g., Dinner at a restaurant"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-bold text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};
