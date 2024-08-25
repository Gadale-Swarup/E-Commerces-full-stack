import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState();
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(()=>{
        if(token){
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser();
        }else{
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
        }
    },[token])

    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", userData);
            setToken(response.data.token);
            setUser(response.data.user);
            console.log(response.data.message);
            toast.success("Logged in successfully!");
            setSuccess(true);
        } catch (error) {
            toast.error("Invalid credentials!");
            setSuccess(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", userData);
            setToken(response.data.token);
            setUser(response.data.user);
            console.log(response.data.message);
            toast.success("Registered successfully!");
            setSuccess(true);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Registration failed!");
            setSuccess(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
    };

    return { user, token, login, register, logout, success };
}

export default useAuth;