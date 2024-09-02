import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = ({ user }) => {
  const [ProductName, setProductname] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("true");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");

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
      setError("User is not authenticated.");
      return;
    }

    const productData = {
      ProductName,
      image,
      category,
      price,
      available,
      quantity,
      description,
    };

    try {
      await axios.post("http://localhost:5000/api/products/addproduct", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      setSuccess("Product added successfully!");
      setProductname("");
      setImage("");
      setCategory("");
      setPrice("");
      setAvailable("true");
      setQuantity("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error("Error adding product:", err.response ? err.response.data : err.message);
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ProductName">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={ProductName}
            onChange={(e) => setProductname(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-black border rounded-lg focus:outline-none focus:ring"
            required
          >
            <option value="" className="text-black">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.CategoryName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
