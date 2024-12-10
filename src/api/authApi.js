import axiosClient from "./axiosClient";
import Cookies from "js-cookie";
export const loginApi = async (data) => {
  const response = await axiosClient.post("/auth/login", data);
  Cookies.set("token", response.data.data.token);

  return response.data;
};
export const registerApi = async (data) => {
  const response = await axiosClient.post("/auth/register", data);
  Cookies.set("token", response.data.data.token);
  return response.data;
};

export const getUserApi = async () => {
  const response = await axiosClient.get("/user");
  return response.data;
};

export const updateUserApi = async (data) => {
  const response = await axiosClient.put("/user/update", data);
  return response.data;
};
