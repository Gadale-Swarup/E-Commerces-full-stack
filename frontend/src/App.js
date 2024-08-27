import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashborad from "./pages/Dashborad"; // Assuming Dashboard is your component
import Register from "./pages/Register";
import useAuthorise from "./hooks/UseAuthorise";

function App() {
  const { user, token, login, logout } = useAuthorise();
  console.log(user)
  
  return (
    <Router>
      <div>
        <Nav user={user} logout={logout} token={token} />
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashborad />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
