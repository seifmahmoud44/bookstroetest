import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCart, removerCartItem, updateQuantityApi } from "../api/cartApi";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Cart = () => {
  const queryClient = useQueryClient();
  // Sample cart items
  const { data: cartItems } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });

  // Calculate
  // total price
  const calculateTotal = () => {
    return cartItems?.data
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2);
  };

  //   remove item

  const { mutate: removerCart, isPending: removerPending } = useMutation({
    mutationFn: removerCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
      toast.success("sucsess");
    },
  });

  //   update cart quantity

  const { mutate: updateCartQuantity, isPending } = useMutation({
    mutationFn: updateQuantityApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
    },
  });
  const handelCartQuantity = (data, id) => {
    const formData = new FormData();
    formData.append("qty", data);

    const finalData = { formData, id };
    updateCartQuantity(finalData);
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      {(isPending || removerPending) && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-35 z-50 flex justify-center items-center">
          <PulseLoader />
        </div>
      )}
      <Toaster richColors position="bottom-right" />
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {cartItems?.data.length === 0 ? (
        <div>
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            className="mt-2 block w-fit m-auto py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
            to={"/"}
          >
            Shop now
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems?.data.map((item) => (
              <li
                key={item.cartId}
                className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow rounded-lg"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500 mb-2">{item.category}</p>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="text-green-500 font-bold mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        disabled={+item.qty <= 1}
                        onClick={() =>
                          handelCartQuantity(+item.qty - 1, item.cartId)
                        }
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 text-gray-700">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          handelCartQuantity(+item.qty + 1, item.cartId)
                        }
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removerCart(item.cartId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4 md:mt-0"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <h2 className="text-lg font-bold">Total: ${calculateTotal()}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
