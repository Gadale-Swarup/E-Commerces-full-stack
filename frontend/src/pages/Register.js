import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuthorise";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const roleChange = (e) => setRole(e.target.value);
  const usernameChange = (e) => setUsername(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const confirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const mobileNumberChange = (e) => setMobileNumber(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await register({
      role,
      username,
      email,
      password,
      mobileNumber,
    });

    if (success) {
      toast.success("Registered Successfully");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      toast.error("Registration failed");
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
              className="select select-bordered max-w-xs text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              value={role}
              onChange={roleChange}
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
                  onChange={usernameChange}
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
              onChange={emailChange}
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
              onChange={mobileNumberChange}
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
              onChange={passwordChange}
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
              onChange={confirmPasswordChange}
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
