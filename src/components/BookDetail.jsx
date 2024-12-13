import { useNavigate, useParams } from "react-router-dom"; // for getting URL params
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookByIdApi } from "../api/booksApi"; // API function to fetch book by ID
import Cookies from "js-cookie";
import { addToCartApi, getCart } from "../api/cartApi";
import { toast, Toaster } from "sonner";
const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => getBookByIdApi(id),
  });

  const { data: cartItems } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    enabled: Cookies.get("token") === undefined ? false : true,
  });

  const queryClient = useQueryClient();

  const isCartBook = cartItems?.data.map((book) => book.bookId).includes(+id);
  console.log(cartItems, id);

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
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const isUser = Cookies.get("token");

  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append("bookId", id);
    mutateAddToCart(formData);
  };
  console.log(isUser);

  return (
    <div className="container mx-auto p-4">
      <Toaster richColors position="bottom-right" />
      {data && (
        <>
          <h1 className="text-2xl font-bold">{data.data.title}</h1>
          <img
            src={data.data.image}
            alt={data.data.title}
            className="w-full h-48 object-cover my-4"
          />
          <p className="text-sm text-gray-600">{data.data.category}</p>
          <p>{data.data.description}</p>
          <p className="font-bold mt-2">{data.data.price}</p>
          <button
            disabled={isCartBook}
            onClick={handleAddToCart}
            className={`disabled:bg-slate-500 block w-full mt-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600  text-white`}
          >
            {isCartBook ? "already adedd to cart " : "Add to cart"}
          </button>
        </>
      )}
    </div>
  );
};

export default BookDetail;
