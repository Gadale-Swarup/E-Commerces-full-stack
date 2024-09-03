import React, { useState } from "react";
import { Link } from "react-router-dom";
// import useAuth from "../hooks/UseAuthorise";

const Sidebar = ({ user,logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { logout } = useAuth();

  return (
    <aside
      className={`relative bg-white-200 h-full p-5 transition-all shadow-lg border-2 border-gray duration-300 flex flex-col text-md font-semibold ${
        sidebarOpen ? "w-72" : "w-12"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-9 cursor-pointer rounded-full border-2 border-black bg-white p-1"
      >
        {/* SVG icon */}
        <svg
  className={`h-6 w-6 transform transition-transform duration-300 ${
    sidebarOpen ? "rotate-0" : "rotate-90"
  }`}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M19 9l-7 7-7-7"
  />
</svg>

      </button>
          {/* {user:} */}
      {/* Sidebar header */}
      <div className="inline-block py-2 mb-2 "
      style={{ display: sidebarOpen ? "block" : "none" }}
      >
         <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4"
            alt="UserName"
          />
        <h1
          className="text-blue-400 transition-opacity duration-300 font-bold text-2xl"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          {user.username}
        </h1>
        <h3
        className="text-blue-400 transition-opacity duration-300 font-bold"
        style={{ display: sidebarOpen ? "block" : "none" }}
        >
            {user.role}
        </h3>
      </div>

      {/* Sidebar menu */}
      {user.role==="admin"?(
        <ul className="flex flex-col space-y-1 overflow-y-auto overflow-x-hidden scrollbar"style={{ display: sidebarOpen ? "block" : "none" }} >
        <li className="group">
        <Link to='*'>
            <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
              <span>📱</span>
              <span style={{ display: sidebarOpen ? "block" : "none" }}>
            Admin Profile
              </span>
            </div>
          </Link>
          <hr className="border-t border-gray-300" style={{ display: sidebarOpen ? "block" : "none" }}/>
          <Link to='addproduct'>
            <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
              <span>📱</span>
              <span style={{ display: sidebarOpen ? "block" : "none" }}>
             Add Products
              </span>
            </div>
          </Link>
          <hr className="border-t border-gray-300" style={{ display: sidebarOpen ? "block" : "none" }}/>
            <Link to='addcategory'>
          <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
            <span>🛒</span>
            <span style={{ display: sidebarOpen ? "block" : "none" }}>
              Add Category
            </span>
          </div>
          </Link>
          <hr
            className="border-t border-gray-300"
            style={{ display: sidebarOpen ? "block" : "none" }}/>
            <Link to='updatecategory'>
          <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
            <span>🛒</span>
            <span style={{ display: sidebarOpen ? "block" : "none" }}>
              Update Category
            </span>
          </div>
          </Link>
          <hr
            className="border-t border-gray-300"
            style={{ display: sidebarOpen ? "block" : "none" }}/>
        </li>
      </ul>
      ):(
      <ul className="flex flex-col space-y-1 overflow-y-auto overflow-x-hidden scrollbar"style={{ display: sidebarOpen ? "block" : "none" }} >
        <li className="group">
          <Link to='products'>
            <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
              <span>📱</span>
              <span style={{ display: sidebarOpen ? "block" : "none" }}>
              Products
              </span>
            </div>
          </Link>
          <hr className="border-t border-gray-300" style={{ display: sidebarOpen ? "block" : "none" }}/>
            <Link to='showcart'>
          <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300">
            <span>🛒</span>
            <span style={{ display: sidebarOpen ? "block" : "none" }}>
              Cart
            </span>
          </div>
            </Link>
          <hr
            className="border-t border-gray-300"
            style={{ display: sidebarOpen ? "block" : "none" }}
          />
        </li>
      
        {/* Additional main menu items */}
        <li className="group">
          <div className="flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-sky-300 transition-colors duration-300"
          >
            <span style={{ display: sidebarOpen ? "block" : "none" }}>
              {user.role || "Role"}
            </span>
          </div>
        </li>
        {/* Add more items as needed */}
      </ul>
    )}
      {/* Sidebar Footer */}
      <div
        className="mt-auto h-48 py-4 px-2 bg-mint-white  -400 rounded-lg shadow-sm"
        style={{ display: sidebarOpen ? "block" : "none" }}
      >
        <div className="flex items-center space-x-3">
          {/* <img
            className="h-10 w-10 rounded-full object-cover"
            src="profile-icon.png"
            alt="User Name"
          /> */}
          <span className="text-black">{user.username}</span>
        </div>
        <hr
          className="mt-2 border-t border-black"
          style={{ display: sidebarOpen ? "block" : "none" }}
        />
        <button 
        className="mt-1 w-full bg-blue-600 text-black py-2 px-4 rounded hover:bg-sky-300 focus:outline-none focus:bg-sky-300 transition-colors duration-300"
        onClick={logout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
