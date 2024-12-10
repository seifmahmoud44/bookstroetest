import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishApi } from "../api/wishListApi";
import { addToCartApi } from "../api/cartApi";
import { toast, Toaster } from "sonner";

const BookCard = ({ book, addToCart }) => {
  const queryClient = useQueryClient();
  // Handle Add to Cart

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: (data) => {
      // update cart count
      // queryClient.invalidateQueries({ queryKey: [""] });

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

  // Handle Add to Wishlist
  const { mutate } = useMutation({
    mutationFn: addToWishApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishListCount"] });

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
  return (
    <div className="p-4 border rounded shadow">
      <Toaster richColors position="bottom-right" />
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
        onClick={handleAddToCart}
        className={`block w-full mt-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600  text-white`}
      >
        Add to Cart
      </button>

      {/* Add to Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        className={`block w-full  mt-2 py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-600 text-white`}
      >
        Add to Wishlist
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
