import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // for getting URL params
import { useQuery } from "@tanstack/react-query";
import { getBookByIdApi } from "../api/booksApi"; // API function to fetch book by ID

const BookDetail = ({ bookData }) => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(bookData);

  // If the bookData prop is not provided, fetch it from API
  const { data, isLoading, error } = useQuery(
    ["bookDetail", id],
    () => getBookByIdApi(id),
    {
      enabled: !bookData, // Only fetch if bookData isn't passed in
      onSuccess: (data) => {
        setBook(data);
      },
    }
  );

  // If the data is provided via props, use it directly
  useEffect(() => {
    if (bookData) {
      setBook(bookData);
    }
  }, [bookData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      {book && (
        <>
          <h1 className="text-2xl font-bold">{book.title || data.title}</h1>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover my-4"
          />
          <p className="text-sm text-gray-600">
            {book.category || data.category}
          </p>
          <p>{book.description}</p>
          <p className="font-bold mt-2">${book.price || data.price}</p>
        </>
      )}
    </div>
  );
};

export default BookDetail;
