import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [success, SetSuccess] = useState(null);
  const [successR, SetRegisterSuccess] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // const navigate = useNavigate(); // Updated to use navigate for navigation

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);


  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      const { successR } = response.data;
      SetRegisterSuccess(successR);
      toast.success(response.data.message);
      console.log(response.data.success);
      console.log(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.log(successR)
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', userData);
      const { token, success, user } = response.data;

      setToken(token);
      setUser(user);
      SetSuccess(success);

      console.log('Login successful, token stored.');
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    successR,
    success,
    register,
    login,
    logout,
  };
};

export default useAuth;
