import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import ShowCart from "../components/Products/ShowCart";
import AddProduct from "../components/Category/AddProduct";
// import useAuth from "../hooks/UseAuthorise";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
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

  const logout = () => {
    Navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <>
      <div className="flex h-screen">
        <div>
          <Sidebar user={user} logout={logout} />
        </div>
        {/* <div className="container ml-5">
          <h2>Welcome to the Dashboard</h2>
          <h3>Name:{user.username}</h3>
          <h4>Email:{user.email}</h4>
          <h4>Role:{user.role}</h4>
        </div> */}
        <div className="container ml-5">
        <Routes>
          <Route path="products" element={<ProductCard/>} />
          <Route path="showcart" element={<ShowCart/>} />
          <Route path="addproduct" element={<AddProduct/>} />
        </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
