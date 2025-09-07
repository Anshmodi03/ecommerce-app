const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced camera system",
    price: 999.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb",
    stock: 50,
  },
  {
    name: "MacBook Pro M2",
    description: "Powerful laptop for professionals",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    stock: 30,
  },
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 129.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 100,
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket for all seasons",
    price: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
    stock: 75,
  },
  {
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with lumbar support",
    price: 249.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
    stock: 25,
  },
  {
    name: "Coffee Table",
    description: "Modern wooden coffee table",
    price: 199.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88",
    stock: 40,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip exercise yoga mat",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    stock: 120,
  },
  {
    name: "Dumbbells Set",
    description: "5-25 lbs adjustable dumbbells",
    price: 299.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1638536532686-d610adde8e14",
    stock: 35,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    stock: 60,
  },
  {
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
    stock: 85,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products);
    console.log("Sample products added successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
