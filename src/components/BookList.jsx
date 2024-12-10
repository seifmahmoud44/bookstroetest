import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooksApi } from "../api/booksApi";

import Paginations from "./Paginations";
import Filters from "./Filters";
import BookCard from "./BoxCard";

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
  }, [filters, setSearchParams]);

  const memoizedFilters = useMemo(() => filters, [filters]);

  // Fetch books with the filters
  const { data, isLoading } = useQuery({
    queryKey: ["books", memoizedFilters],
    queryFn: () => getBooksApi(memoizedFilters),
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Books List</h1>
      <Filters filters={filters} handleChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? "Loading..."
          : data?.data.map((book) => (
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
  );
}
