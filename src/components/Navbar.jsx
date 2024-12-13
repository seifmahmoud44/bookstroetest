import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../api/authApi"; // Import user API
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { getWishCount } from "../api/wishListApi";
import Cookies from "js-cookie";
import { getCart } from "../api/cartApi";

const Navbar = () => {
  const navigate = useNavigate();

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    enabled: Cookies.get("token") === undefined ? false : true,
  });

  // wish list count
  const { data: wishlistCount } = useQuery({
    queryKey: ["wishListCount"],
    queryFn: getWishCount,
    enabled: Cookies.get("token") === undefined ? false : true,
  });

  const { data: cartItems } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    enabled: Cookies.get("token") === undefined ? false : true,
  });
  console.log(cartItems);

  const cartCount = cartItems?.data.length;
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-white text-lg font-bold">MyApp</h1>

          {/* Navigation Links */}
          <Link to="/" className="text-white hover:text-blue-300">
            Products
          </Link>
        </div>

        {/* Cart and Wishlist */}
        {user && (
          <div className="flex items-center space-x-8">
            {/* Cart */}
            <div className="relative">
              <Link to="/cart" className="text-white hover:text-blue-300">
                Cart
              </Link>
              {
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              }
            </div>

            {/* Wishlist */}
            <div className="relative">
              <Link to="/wishlist" className="text-white hover:text-blue-300">
                Wishlist
              </Link>
              {
                <span className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount?.data.count}
                </span>
              }
            </div>
            <button
              onClick={() => {
                Cookies.remove("token");
                window.location.reload();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            >
              logout
            </button>
          </div>
        )}

        {/* Login or User Info */}
        <div>
          {user && (
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/profile")}
                className="flex justify-center items-center gap-5 cursor-pointer"
              >
                <p className="text-white text-sm">{user.name}</p>
                <img
                  src={user.image || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              {/* Logout button logic can be added here */}
            </div>
          )}
          {!Cookies.get("token") && (
            <Link
              to={"/signin"}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
