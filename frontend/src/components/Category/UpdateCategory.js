import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

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

  const handleSelectCategory = (e) => {
    const selectedId = e.target.value;
    const selectedCat = categories.find((cat) => cat._id === selectedId);
    setSelectedCategory(selectedCat);
    setNewCategoryName(selectedCat ? selectedCat.CategoryName : '');
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      const token = localStorage.getItem('token');
      try {
        await axios.put(
          `http://localhost:5000/api/categories/updatecategory/${selectedCategory._id}`,
          { CategoryName: newCategoryName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Category updated successfully!");

        // Update categories state with the new name
        setCategories(categories.map((cat) =>
          cat._id === selectedCategory._id ? { ...cat, CategoryName: newCategoryName } : cat
        ));

        setSelectedCategory(null);
        setNewCategoryName('');
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Failed to update category.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 h-auto bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Category</h2>
      {error && <p className="text-red-500">{error}</p>}

      {categories.length > 0 ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Category</h3>
          <select
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 bg-white rounded-md mb-4"
            onChange={handleSelectCategory}
            value={selectedCategory ? selectedCategory._id : ''}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.CategoryName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>No categories available.</p>
      )}

      {selectedCategory && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold  text-gray-700 mb-2">Update Category</h3>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full px-4 py-2 border text-gray-800 bg-white border-gray-300 rounded-md"
            placeholder="Enter new category name"
          />
          <button
            onClick={handleUpdateCategory}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            Update Category
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;
