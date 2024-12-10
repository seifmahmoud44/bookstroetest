import { useParams } from "react-router-dom"; // for getting URL params
import { useQuery } from "@tanstack/react-query";
import { getBookByIdApi } from "../api/booksApi"; // API function to fetch book by ID

const BookDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => getBookByIdApi(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
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
        </>
      )}
    </div>
  );
};

export default BookDetail;
