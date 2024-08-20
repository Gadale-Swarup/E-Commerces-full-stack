import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
// import Register from "./components/Register";
import Dashboard from "./components/Dashborad"; // Assuming Dashboard is your component
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* <Route path="/" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
