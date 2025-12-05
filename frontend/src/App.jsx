import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./fontawesome";

function App() {
  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
