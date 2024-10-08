import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState();
  const [registerSuccess, setRegisterSuccess] = useState();
  const [token, setToken] = useState();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
    } 
    if(!token){
        console.log("No token Found");
    }
    else {
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
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData
      );
      setSuccess(response.data.success);
      console.log(success);
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      console.log("Login successful, token stored.");
      console.log(token);
      toast.success("Logged in successfully");
      return success;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  return {
    user,
    token,
    success,
    registerSuccess,
    register,
    login,
    logout,
  };
};

export default useAuth;
