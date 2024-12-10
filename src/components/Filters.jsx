import React from "react";

export default function Filters({ filters, handleChange }) {
  return (
    <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="e.g., Fiction"
        />
      </div>

      {/* Min Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sort</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
