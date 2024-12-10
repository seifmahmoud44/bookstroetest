import axiosClient from "./axiosClient";

export const getBooksApi = async (filters) => {
  // Construct query string from filters
  const query = new URLSearchParams(filters).toString();
  console.log(query);

  // Make API call
  const response = await axiosClient.get(`/books?${query}`);

  // Return response data
  return response.data;
};

export const getBookByIdApi = async (id) => {
  const response = await axiosClient.get(`/books/${id}`);

  return response.data;
};
