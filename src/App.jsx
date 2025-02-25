import "./App.css";
import FormLogin from "./components/FormLogin";
import FormRegistro from "./components/FormRegistro";
import Dashboard from "./components/Dashboard";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter></BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/registro" element={<FormRegistro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
