const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  key: { type: String },
  value: { type: String },
});

const sizeSchema = new mongoose.Schema({
  size: { type: String },
  quantity: { type: Number },
});

const variantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  attributes: [attributeSchema],
  availibleSizes: [sizeSchema],
  image: [{ type: String }],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slog: { type: String, required: true },
  status: { type: String, default: "visible" },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  images: [{ type: String }],
  gender: { type: String },
  stock: { type: Number, required: true },
  variants: [variantSchema],
});

module.exports = mongoose.model("Product", productSchema);
