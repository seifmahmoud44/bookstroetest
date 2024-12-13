import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected content
  return children;
}
