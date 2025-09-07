const User = require("../models/User");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    // Filter out cart items with null or deleted products
    const validCartItems = user.cart.filter((item) => item.product !== null);

    // Update user cart if invalid items were found
    if (validCartItems.length !== user.cart.length) {
      user.cart = validCartItems;
      await user.save();
    }

    res.json(validCartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId, quantity } = req.body;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();

    // Populate the cart before returning
    await user.populate("cart.product");
    const validCartItems = user.cart.filter((item) => item.product !== null);
    res.json(validCartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.body.productId
    );
    await user.save();

    // Populate the cart before returning
    await user.populate("cart.product");
    const validCartItems = user.cart.filter((item) => item.product !== null);
    res.json(validCartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId, quantity } = req.body;

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();

    // Populate the cart before returning
    await user.populate("cart.product");
    const validCartItems = user.cart.filter((item) => item.product !== null);
    res.json(validCartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
