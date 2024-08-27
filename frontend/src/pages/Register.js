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
      <div className="grid min-h-screen place-items-center">
        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold">
            Hello there,{" "}
            <span className="font-normal">
              please fill in your information to continue
            </span>
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <label
              htmlFor="role"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Role
            </label>
            <select
              id="role"
              className="select select-bordered max-w-xs text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-between gap-3">
              <span className="w-1/2">
                <label
                  htmlFor="firstname"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Firstname
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="John"
                  autoComplete="given-name"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </span>
              <span className="w-1/2">
                <label
                  htmlFor="lastname"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Lastname
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  autoComplete="family-name"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                />
              </span>
            </div>
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john.doe@company.com"
              autoComplete="email"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label
              htmlFor="MobileNumber"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Mobile Number
            </label>
            <input
              id="MobileNumber"
              type="tel"
              name="MobileNumber"
              placeholder="9922443377"
              autoComplete="tel"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
              required
            />
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label
              htmlFor="password-confirm"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Confirm password
            </label>
            <input
              id="password-confirm"
              type="password"
              name="password-confirm"
              placeholder="********"
              autoComplete="new-password"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Sign up
            </button>
            <Link to="/login">
              <p className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                Already registered?
              </p>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
