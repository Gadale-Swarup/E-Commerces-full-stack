import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import useAuth from "../hooks/UseAuthorise";


function Login() {
  // const { login, success } = useAuth();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData
      );
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      console.log("Login successful, token stored.");
      console.log(token);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">SG</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="email"
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
                  autoComplete="password"
                  required
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                </button>
              </form>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 ring-inset">
                    Forgot Password?
                  </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <button
                    className="transition duration-200 mx-5 px-5 py-4 font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 ring-inset"
                    onClick={() => navigate("/")}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
