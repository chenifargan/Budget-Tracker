import React from "react";
import { AddBudget } from "../Components/AddBudget";
import { Transaction } from "../Components/Transaction";
import { ByCategory } from "../Components/ByCategory";

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col ">
      <h2 className="text-black m-5 font-bold">Personal Budget Tracker</h2>
      <AddBudget />
      <Transaction />
      <ByCategory />
    </div>
  );
};
