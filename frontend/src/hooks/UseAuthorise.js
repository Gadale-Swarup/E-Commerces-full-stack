import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState();
  const [registerSuccess, setRegisterSuccess] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token, user]);

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );

      if (response.data.success === true) {
        setRegisterSuccess(response.data.success);
        toast.success(response.data.message);
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "registration failed");
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login",userData);
      const { token } = response.data;
      setToken(token);
    //   setUser(user);
      setSuccess(response.data.success);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setSuccess(false);
    setRegisterSuccess(false);
  };

  return {
    user,
    token,
    success,
    registerSuccess, // Indicates if registration was successful
    register,
    login,
    logout,
  };
};

export default useAuth;
