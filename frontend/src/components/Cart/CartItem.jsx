import { memo, useCallback } from "react";
import { useCart } from "../../context/CartContext";

const CartItem = memo(({ item }) => {
  const { removeFromCart, updateQuantity, loading } = useCart();
  const itemTotal = (item.product.price * item.quantity).toFixed(2);

  const handleQuantityChange = useCallback(
    (newQuantity) => {
      if (newQuantity > 0 && newQuantity !== item.quantity) {
        updateQuantity(item.product._id, newQuantity);
      }
    },
    [item.product._id, item.quantity, updateQuantity]
  );

  const handleRemove = useCallback(() => {
    removeFromCart(item.product._id);
  }, [item.product._id, removeFromCart]);

  const handleDecrement = useCallback(() => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  }, [item.quantity, handleQuantityChange]);

  const handleIncrement = useCallback(() => {
    handleQuantityChange(item.quantity + 1);
  }, [item.quantity, handleQuantityChange]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4 w-full sm:w-auto">
        {item.product.image && (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-lg shadow-sm"
            loading="lazy"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">
            {item.product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            ${item.product.price.toFixed(2)} each
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrement}
                disabled={loading || item.quantity <= 1}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                −
              </button>
              <span className="px-4 py-1 bg-white border-l border-r border-gray-300 min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={loading}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">${itemTotal}</p>
          <p className="text-xs text-gray-500">
            {item.quantity} × ${item.product.price.toFixed(2)}
          </p>
        </div>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
