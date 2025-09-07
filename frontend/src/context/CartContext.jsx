import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error("Error parsing stored cart:", error);
          localStorage.removeItem("cart"); // Clear invalid cart data
          setCart([]);
        }
      }
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error.message || "Failed to fetch cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLocalCart = (newCart) => {
    setCart(newCart);
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setError(null);
    try {
      if (user) {
        setLoading(true);
        const { data } = await API.post("/cart/add", { productId, quantity });
        setCart(data);
      } else {
        const item = cart.find((i) => i.product._id === productId);
        if (item) {
          const updatedCart = cart.map((i) =>
            i.product._id === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
          updateLocalCart(updatedCart);
        } else {
          setLoading(true);
          const { data: product } = await API.get(`/products/${productId}`);
          updateLocalCart([...cart, { product, quantity }]);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.message || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setError(null);
    try {
      if (user) {
        setLoading(true);
        const { data } = await API.post("/cart/remove", { productId });
        setCart(data);
      } else {
        const updatedCart = cart.filter((i) => i.product._id !== productId);
        updateLocalCart(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError(error.message || "Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setError(null);
    try {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }

      if (user) {
        setLoading(true);
        const { data } = await API.post("/cart/update", {
          productId,
          quantity,
        });
        setCart(data);
      } else {
        const updatedCart = cart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        updateLocalCart(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError(error.message || "Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
