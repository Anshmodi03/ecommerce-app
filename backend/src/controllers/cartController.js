const User = require("../models/User");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId, quantity } = req.body;
    const existing = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    res.json(user.cart);
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
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
