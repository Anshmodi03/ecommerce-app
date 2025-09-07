import { useMemo } from "react";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../common/LoadingSpinner";

const Cart = () => {
  const { cart, loading } = useCart();

  const { subtotal, tax, total, itemCount, savings } = useMemo(() => {
    // Filter out items with null or undefined products
    const validCartItems = cart.filter(
      (item) => item && item.product && item.product.price !== undefined
    );

    const subtotal = validCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = validCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    const savings = 0; // Could add promotional savings later
    const total = subtotal + tax - savings;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      itemCount,
      savings: savings.toFixed(2),
    };
  }, [cart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <div className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md">
            {cart.length === 0 ? (
              <div className="p-12 text-center">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.5M17 13v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m8 0V9a1 1 0 00-1-1H9a1 1 0 00-1 1v4.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <a
                  href="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="divide-y">
                {cart
                  .filter((item) => item && item.product && item.product._id)
                  .map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}
              </div>
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {parseFloat(savings) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    ${total}
                  </span>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>

              <div className="mt-4 text-center">
                <a
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
