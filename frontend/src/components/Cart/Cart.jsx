import { useMemo } from "react";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../common/LoadingSpinner";

const Cart = () => {
  const { cart, loading } = useCart();

  const { total, itemCount } = useMemo(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { total: total.toFixed(2), itemCount };
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
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="text-gray-600">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <a
              href="/products"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cart.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
