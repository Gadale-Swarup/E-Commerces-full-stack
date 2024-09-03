import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const AddCart = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const product = products.find((prod) => prod.id === productId);
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-wrap gap-5 p-5">
      {products.map((prod) => (
        <div key={prod.id} className="max-w-xs w-full bg-gray-900 shadow-lg rounded-xl p-6">
          <div className="flex flex-col">
            <div className="relative h-72 w-full mb-3">
              <div className="absolute flex flex-col top-0 right-0 p-3">
                <button className="transition ease-in duration-300 bg-gray-800 hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <img
                src={prod.image}
                alt={prod.ProductName}
                className="w-full h-72 object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col flex-auto">
              <div className="flex flex-wrap mb-2">
                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-400 whitespace-nowrap mr-3">4.60</span>
                  <span className="mr-2 text-gray-400">India</span>
                </div>
                <div className="flex items-center w-full justify-between min-w-0">
                  <h2 className="text-lg text-gray-200 truncate hover:text-purple-500">
                    {prod.ProductName}
                  </h2>
                  <div className="flex items-center bg-green-400 text-white text-sm px-2 py-1 ml-3 rounded-lg">
                    {prod.quantity}
                  </div>
                </div>
              </div>
              <div className="text-xl text-white font-semibold mt-1">${prod.price}</div>
              <div className="flex space-x-2 text-sm font-medium justify-start pt-3">
                <Link to='../showcart'>
                  <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
                    <span>Show Cart</span>
                  </button>
                </Link>
                <button
                  className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600"
                  onClick={() => AddCart(prod.id)}
                >
                  <span>Add Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
