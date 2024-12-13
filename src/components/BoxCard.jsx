import { Link, useNavigate } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishApi,
  getWishCount,
  getWishListApi,
  removerWishItem,
} from "../api/wishListApi";
import { addToCartApi, getCart } from "../api/cartApi";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

const BookCard = ({ book, addToCart }) => {
  const queryClient = useQueryClient();
  // Handle Add to Cart

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: (data) => {
      // update cart count
      queryClient.invalidateQueries({ queryKey: ["getCart"] });

      toast.success("sucsessfully add to cart");
    },
    onError: (data) => {
      toast.error(data?.response.data.message);
    },
  });

  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append("bookId", book.id);
    mutateAddToCart(formData);
  };

  const { data: cartItems } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    enabled: Cookies.get("token") === undefined ? false : true,
  });

  const isCartBook = cartItems?.data
    .map((book) => book.bookId)
    .includes(book.id);

  // Handle Add to Wishlist
  const { mutate } = useMutation({
    mutationFn: addToWishApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["wishListCount"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getWishListByUser"],
      });

      toast.success("sucsessfully");
    },
    onError: (data) => {
      toast.error(data?.response.data.message);
    },
  });
  const handleAddToWishlist = () => {
    const formData = new FormData();
    formData.append("bookId", book.id);
    mutate(formData);
  };

  const { data } = useQuery({
    queryKey: ["getWishListByUser"],
    queryFn: getWishListApi,
    enabled: Cookies.get("token") === undefined ? false : true,
  });

  const isWishListItem = data?.data
    .map((item) => item.book.id)
    .includes(book.id);
  const isUser = Cookies.get("token");
  const navigate = useNavigate();
  return (
    <div className="p-4 border rounded shadow">
      <Toaster richColors position="bottom-right" />
      <p>{book.id}</p>
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.category}</p>
      <p className="text-sm">{book.description}</p>
      <p className="font-bold mt-2">${book.price}</p>

      {/* Add to Cart Button */}
      <button
        disabled={isCartBook}
        onClick={() =>
          isUser === undefined ? navigate("/signin") : handleAddToCart()
        }
        className={`disabled:bg-slate-500 block w-full mt-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600  text-white`}
      >
        {isCartBook ? "already adedd to cart " : "Add to cart"}
      </button>

      {/* Add to Wishlist Button */}
      <button
        disabled={isWishListItem}
        onClick={() =>
          isUser === undefined ? navigate("/signin") : handleAddToWishlist()
        }
        className={`disabled:bg-slate-600 block w-full  mt-2 py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-600 text-white`}
      >
        {isWishListItem ? "already adedd to wish list" : "Add to Wishlist"}
      </button>
      {/*veiw Button */}
      <Link
        to={`books/${book.id}`}
        className={`text-center block w-full mt-2 py-2 px-4 rounded bg-black text-white`}
      >
        Veiw Details
      </Link>
    </div>
  );
};

export default BookCard;
