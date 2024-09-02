import React, { useEffect, useState } from "react";

const AddCategory = () => {
    const [categories,setCategories]=useState([]);
    const [CategoryName,setCategoryName]=useState();


    
  return (
    <>
      <div>AddCategory</div>
      <div>
        <form action={handlesubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="ProductName">
              Product Name
            </label>
            <input
              type="text"
              name="ProductName"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
      </div>
    </>
  );
};

export default AddCategory;
