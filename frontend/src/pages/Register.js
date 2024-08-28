import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuthorise";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const requestData = { role, username, email, password, mobileNumber };
    console.log("Request Data:", requestData);
    try {
      await register(requestData);
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Role
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="username"
                  required
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="email"
                  required
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                  autoComplete="tel"
                  required
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="new-password"
                  required
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Sign up</span>
                </button>
              </form>
            </div>

            <div className="py-5">
              <div className="text-center whitespace-nowrap">
                <Link to="/login">
                  <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 ring-inset">
                    Already registered? Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
