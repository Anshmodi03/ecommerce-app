import { memo } from "react";
import { useCart } from "../../context/CartContext";

const CartItem = memo(({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const itemTotal = (item.product.price * item.quantity).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.product._id, newQuantity);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        {item.product.image && (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded"
            loading="lazy"
          />
        )}
        <div>
          <h3 className="font-medium">{item.product.name}</h3>
          <p className="text-gray-600">
            Unit Price: ${item.product.price.toFixed(2)}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <p className="font-medium text-lg">${itemTotal}</p>
        <button
          onClick={() => removeFromCart(item.product._id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
