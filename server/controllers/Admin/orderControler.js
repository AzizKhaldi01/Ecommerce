// insert order , delete order , update order ,
const OrderModal = require("../../models/Orders");
const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utils/auth");

const insertOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    // Verify token and get the user
    let user;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      user = decodedUser; // Set the user from the decoded token
    });

    console.log(user);

    const { fullName, addressLine1, city, phone } = shippingAddress;

    // Prepare the items for the order (handle products with or without variants)
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        let selectedVariant;
        let price;
        let variantTitle = null;
        let image = product.images[0];

        if (item.variantId) {
          selectedVariant = product.variants.find(
            (variant) => variant._id.toString() === item.variantId
          );

          if (!selectedVariant) {
            throw new Error(`Variant not found for product ${item.productId}`);
          }

          price = selectedVariant.price;
          variantTitle = selectedVariant.title;
          image = selectedVariant.image[0] || image; // Use variant image if available
        } else {
          // Product without variants
          price = product.price;
        }

        return {
          productId: product._id,
          variantId: selectedVariant ? selectedVariant._id : null, // null if no variant
          slog: product.slog,
          title: product.title,
          variantTitle, // null if no variant
          price,
          quantity: item.quantity,
          image,
        };
      })
    );

    // Create the order
    const newOrder = new OrderModal({
      user: user._id,
      items: orderItems,
      shippingAddress: {
        fullName,
        addressLine1,
        city,
        phone,
      },
      totalAmount: orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      paymentStatus: "unpaid",
      orderStatus: "pending",
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order inserted successfully",
      data: newOrder,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const user = verifyToken();

    const { fullName, addressLine1, city, phone } = shippingAddress;

    // Prepare the items for the order (handle products with or without variants)
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        let selectedVariant;
        let price;
        let variantTitle = null;
        let image = product.images[0];

        if (item.variantId) {
          selectedVariant = product.variants.find(
            (variant) => variant._id.toString() === item.variantId
          );

          if (!selectedVariant) {
            throw new Error(`Variant not found for product ${item.productId}`);
          }

          price = selectedVariant.price;
          variantTitle = selectedVariant.title;
          image = selectedVariant.image[0] || image; // Use variant image if available
        } else {
          // Product without variants
          price = product.price;
        }

        return {
          productId: product._id,
          variantId: selectedVariant ? selectedVariant._id : null, // null if no variant
          slog: product.slog,
          title: product.title,
          variantTitle, // null if no variant
          price,
          quantity: item.quantity,
          image,
        };
      })
    );

    // Create the order
    const newOrder = new OrderModal({
      user: user._id,
      items: orderItems,
      shippingAddress: {
        fullName,
        addressLine1,
        city,
        phone,
      },
      totalAmount: orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      paymentStatus: "unpaid",
      orderStatus: "pending",
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order inserted successfully",
      data: newOrder,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { insertOrder };
