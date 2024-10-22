import Product from "../models/Product";
import { createSlug } from "../utils/slug";


function calculateStock(variants) {
  let totalStock = 0;
  variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      totalStock += size.quantity;
    });
  });
  return totalStock;
}

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, variants } = req.body;

    // Calculate total stock before saving
    const stock = calculateStock(variants);
    const Slog = createSlug(title ,category );

    // Create and save the new product
    const newProduct = new Product({
      title,
      description,
      price,
      Slog,
      category,
      stock,
      variants,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding product", message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { Slog } = req.body;

    // Find the product by its ID and select only the fields you need
    const SelectedProduct = await Product.findById(ID).lean(); // .lean() improves performance by returning plain JS objects

    if (!SelectedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Destructure required fields from the product
    const { title, description, price, category, stock, variants } =
      SelectedProduct;

    // Map through the variants to pick only the specific fields (price, one image, title, attributes)
    const selectedVariants = variants.map((variant) => ({
      price: variant.price,
      image: variant.image[0], // Assume the first image is selected
      title: variant.title,
      attributes: variant.attributes,
    }));

    // Construct the new product object with the required fields
    const newProduct = {
      title,
      description,
      price,
      category,
      stock,
      variants: selectedVariants, // Include the filtered variants
    };

    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving product", message: error.message });
  }
};
