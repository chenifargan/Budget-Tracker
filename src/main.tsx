import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider } from "./Context/TransactionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TransactionProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TransactionProvider>
  </BrowserRouter>
);
