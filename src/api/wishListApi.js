import axiosClient from "./axiosClient";

export const addToWishApi = async (data) => {
  const response = await axiosClient.post("/wishlist/add", data);
  return response.data;
};

// problem with API
export const removerWishItem = async (data) => {
  const response = await axiosClient.post("/wishlist/remove", data);
  return response.data;
};

export const getWishListApi = async () => {
  const response = await axiosClient.get("/wishlist/get");
  return response.data;
};

export const getWishCount = async () => {
  const response = await axiosClient.get("/wishlist/count");
  return response.data;
};
