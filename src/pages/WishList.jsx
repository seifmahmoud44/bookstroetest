import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getWishListApi, removerWishItem } from "../api/wishListApi";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

export default function WishList() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["getWishListByUser"],
    queryFn: getWishListApi,
  });

  const { mutate } = useMutation({
    mutationFn: removerWishItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["getWishListByUser"]);
      toast.success("sucsess");
    },
  });

  const handelRemover = (id) => {
    const formData = new FormData();
    formData.append("wishlistId", id);
    mutate(formData);
  };

  return (
    <div>
      <ul className="space-y-4">
        <Toaster richColors position="bottom-right" />
        {data?.data.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">Your wish list is empty.</p>
            <Link
              className="mt-2 block w-fit m-auto py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
              to={"/"}
            >
              Shop now
            </Link>
          </div>
        ) : (
          data?.data.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow rounded-lg"
            >
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.book.title}</h2>
                  <p className="text-gray-500 mb-2">{item.book.category}</p>
                  <p className="text-gray-500 text-sm">
                    {item.book.description}
                  </p>
                  <p className="text-green-500 font-bold mt-2">
                    {item.book.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handelRemover(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4 md:mt-0"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
