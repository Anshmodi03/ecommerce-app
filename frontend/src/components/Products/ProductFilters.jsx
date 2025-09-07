import { useState } from "react";

const ProductFilters = ({ filters, setFilters }) => {
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Fashion",
    "Furniture",
    "Sports",
  ];

  // Local state for draft filter values
  const [draftFilters, setDraftFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(draftFilters);
  };

  const handleClearFilters = () => {
    const clearFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "price_asc",
    };
    setDraftFilters(clearFilters);
    setFilters(clearFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>

      <div>
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          value={draftFilters.category}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, category: e.target.value })
          }
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min $"
            value={draftFilters.minPrice}
            onChange={(e) =>
              setDraftFilters({ ...draftFilters, minPrice: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max $"
            value={draftFilters.maxPrice}
            onChange={(e) =>
              setDraftFilters({ ...draftFilters, maxPrice: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Sort By</label>
        <select
          value={draftFilters.sort}
          onChange={(e) =>
            setDraftFilters({ ...draftFilters, sort: e.target.value })
          }
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
      </div>

      <div className="space-y-2 pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
