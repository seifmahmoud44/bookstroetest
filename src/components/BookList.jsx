import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooksApi } from "../api/booksApi";

import Paginations from "./Paginations";
import Filters from "./Filters";
import BookCard from "./BoxCard";
import { PulseLoader } from "react-spinners";

export default function BooksList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL params when filters change
  const filtersFromParams = Object.fromEntries([...searchParams]);
  const [filters, setFilters] = useState({
    page: parseInt(filtersFromParams.page) || 1,
    category: filtersFromParams.category || "",
    minPrice: filtersFromParams.minPrice || 0,
    maxPrice: filtersFromParams.maxPrice || 1000,
    sort: filtersFromParams.sort || "low",
  });

  useEffect(() => {
    setSearchParams(filters);
    if (data?.data.length === 0) {
      filters.page = "";
    }
    filters.page = 1;
  }, [filters, setSearchParams]);

  // Fetch books with the filters
  const { data, isLoading } = useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooksApi(filters),
  });

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  // Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto ">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-35 z-50 flex justify-center items-center">
          <PulseLoader />
        </div>
      )}
      <h1 className="text-2xl font-bold my-4">Books List</h1>
      <Filters
        filters={filters}
        handleChange={handleFilterChange}
        isLoading={isLoading}
      />
      {data?.data.length === 0 ? (
        <p className="text-center">no products avilable</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data.map((book) => (
              <div key={book.id}>
                <BookCard key={book.id} book={book} />
              </div>
            ))}
          </div>
          <Paginations
            data={data}
            filters={filters}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
