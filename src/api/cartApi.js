import axiosClient from "./axiosClient";

export const addToCartApi = async (data) => {
  const response = await axiosClient.post("/cart", data);
  return response.data;
};

export const updateQuantityApi = async (data) => {
  console.log(data);

  const response = await axiosClient.post(`cart/${data.id}`, data.formData);
  return response.data;
};

export const getCart = async () => {
  const response = await axiosClient.get("/cart");
  return response.data;
};

export const removerCartItem = async (id) => {
  const response = await axiosClient.delete(`cart/${id}`);
  return response.data;
};
