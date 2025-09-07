const ProductFilters = ({ filters, setFilters }) => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden"];

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full p-2 border rounded-md"
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
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
