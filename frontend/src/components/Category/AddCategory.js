import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.error(
          "Error fetching categories:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching categories. Please check the console for more details.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories/addcategory",
        { CategoryName: categoryName }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        }
      );
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data, 
        ]);
        setCategoryName('');
        toast.success('Category successfully added');
    } catch (err) {
      console.error("Error adding category:", err.response ? err.response.data : err.message);
      toast.error("Category not added. Try again.");
      setError("Category not added. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 h-auto bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Category</h2>
      {categories.length > 0 ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Categories</h3>
          <select
          className="w-full px-4 py-2 border border-gray-300 text-gray-800 bg-white rounded-md mb-4"
          >
            {/* <option value=''>Views Categories </option> */}
            {categories.map((cat)=>(
              <option>{cat.CategoryName}</option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-gray-600">No categories available.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="CategoryName">
            Category Name
          </label>
          <input
            type="text"
            id="CategoryName"
            name="CategoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring"
        >
          Add Category
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddCategory;
