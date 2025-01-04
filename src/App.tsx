import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-[700px] h-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
