import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();
    data.append('name', productData.name);
    data.append('description', productData.description);
    data.append('price', productData.price);
    if (productData.image) {
      data.append('image', productData.image);
    }

    // Send data to the server
    fetch('/api/products', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Product added successfully:', result);
        // Clear the form after submission
        setProductData({
          name: '',
          description: '',
          price: '',
          image: null,
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
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
  );
};

export default AddProduct;
