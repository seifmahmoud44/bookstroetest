import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  baseURL: "https://api.codingarabic.online/api/", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include tokens if available
axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
