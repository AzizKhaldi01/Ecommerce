const mongoose = require("mongoose");

// Schema for each item in the order
const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant", // Reference to the variant schema
    required: true, // Ensure that a variant is selected
  },
  slog: { type: String, required: true },
  title: { type: String, required: true }, // Title of the product
  variantTitle: { type: String }, // Title of the variant (e.g., "8GB RAM")
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    items: [ItemSchema],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
    }, // Payment status
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "completed",
        "canceled",
        "returned",
      ],
      default: "pending",
    },
    paymentDetails: {
      method: { type: String },
      transactionId: { type: String },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      // addressLine2: { type: String },
      // postalCode: { type: String, required: true },
      // country: { type: String, required: true },
    },
    trackingNumber: { type: String },
    shippingDate: { type: Date },
    deliveredDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
