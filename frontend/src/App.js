import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
// import Register from "./components/Register";
import Dashboard from "./pages/Dashborad"; // Assuming Dashboard is your component
import Register from "./pages/Register";
import useAuthorise from "./hooks/UseAuthorise";

function App() {
  const { user, token, login, logout } = useAuthorise();
  
  return (
    <Router>
      <div>
        <Nav user={user} logout={logout} token={token} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
