import { useState, useEffect, useCallback } from "react";
import API from "../../services/api";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import LoadingSpinner from "../common/LoadingSpinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "price_asc",
  });

  // Fetch products function - now only calls API when needed
  const fetchProducts = useCallback(async (appliedFilters) => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (appliedFilters.category) params.category = appliedFilters.category;
      if (appliedFilters.minPrice)
        params.minPrice = parseFloat(appliedFilters.minPrice);
      if (appliedFilters.maxPrice)
        params.maxPrice = parseFloat(appliedFilters.maxPrice);
      if (appliedFilters.sort) params.sort = appliedFilters.sort;

      const { data } = await API.get("/products", { params });
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and when filters change
  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 font-medium mb-2">
            Oops! Something went wrong
          </div>
          <div className="text-red-500 text-sm mb-4">{error}</div>
          <button
            onClick={() => fetchProducts(filters)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </aside>
        <main className="w-full lg:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <div className="text-gray-600">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: "",
                      minPrice: "",
                      maxPrice: "",
                      sort: "price_asc",
                    })
                  }
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
