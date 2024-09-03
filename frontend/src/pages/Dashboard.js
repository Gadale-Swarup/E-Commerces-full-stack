import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import ShowCart from "../components/Products/ShowCart";
import AddProduct from "../components/Products/AddProduct";
import AddCategory from "../components/Category/AddCategory";
import UpdateCategory from "../components/Category/UpdateCategory";
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
      <div className=" container flex h-full">
        <div>
          <Sidebar user={user} logout={logout} />
        </div>
        <div className="container  h-screen">
          <Routes>
          <Route path="showcart" element={<ShowCart />} />
            <Route path="products" element={<ProductCard />} />
            <Route path="addproduct" element={<AddProduct user={user} />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="updatecategory" element={<UpdateCategory/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
