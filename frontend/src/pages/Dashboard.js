import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/UseAuthorise";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate =useNavigate();
  // const {logout}=useAuth();

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/getUserInfo",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User Info:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response ? error.response.data : error.message
        );
      }
    }
  
    getUserInfo();
  }, []);
  
  const logout =()=>{
    Navigate('/login')
    localStorage.removeItem("token");
    setUser(null);
  }
  return (
    <div className="flex">
      <div>
        <Sidebar user={user} logout={logout} />
      </div>
      <div className="container ml-5">
        <h2>Welcome to the Dashboard</h2>
        <h3>Name:{user.username}</h3>
        <h4>Email:{user.email}</h4>
        <h4>Role:{user.role}</h4>
      </div>
    </div>
  );
};

export default Dashboard;
