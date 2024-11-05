const Product = require("../../models/Product");
const paginate = require("../../utils/pagination");
const { createSlug } = require("../../utils/slug");

function calculateStock(variants) {
  let totalStock = 0;
  variants.forEach((variant) => {
    totalStock += variant.quantity;
  });
  return totalStock;
}

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, variants, gender } = req.body;
    // Calculate total stock before saving
    const stock = calculateStock(variants);
    const slog = createSlug(title, category);

    // Create and save the new product
    const newProduct = new Product({
      title,
      gender,
      description,
      price,
      slog,
      category,
      stock,
      variants,
    });

    await newProduct.save();

    res.status(201).json({ slog: newProduct.slog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding product", message: error.message });
  }
};



const getProduct = async (req, res) => {
  try {
    const { slog } = req.params; 
    // Find the product by its ID and select only the fields you need
    const SelectedProduct = await Product.findOne({ slog });
    if (!SelectedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { title, description, price, category, stock, variants, images } =
      SelectedProduct;

    const selectedVariants = variants.map((variant) => ({
      price: variant.price,
      image: variant.image[0],
      title: variant.title,
      avalibleSizes: variant.availibleSizes,
      attributes: variant.attributes,
    }));

    const newProduct = {
      title,
      description,
      price,
      image: images[0],
      category,
      slog,
      stock,
      variants: selectedVariants,
    };

    res.status(200).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving product", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { slog } = req.params;
    // Find the item by slog and update it
    const updatedItem = await Product.findOneAndUpdate({ slog }, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Respond with the updated item
    res.json({ message: "product was updated" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update item", message: error.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { slog } = req.params; // Expecting slog to be passed as a URL parameter
    // Find the item by slog and update it
    const updatedItem = await Product.findOneAndUpdate(
      { slog }, // Query to find the document by slog
      req.body, // New data to update the document
      { new: true } // Return the updated document
    );

    // Check if the item was found and updated
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Respond with the updated item
    res.json({ message: "product was deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update item", message: error.message });
  }
};



const getAllProducts = async (req, res) => {
  try {
    const { limit, page } = req.query; // Retrieve from the query parameters
    const skip = (page - 1) * limit;

    const Allresult = await Product.find({ status: "visible" }) // Filter for products with status 'visible'
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({ status: "visible" });

    const result = Allresult.map((item) => ({
      price: item.price,
      title: item.title,
      slog: item.slog,
      image: item.images[0],
      sold: item.sold,
      stock: item.stock,
    }));

    res.status(200).json({
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      products: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving products", message: error.message });
  }
};

const selectProductInfos = async (req, res) => {
  try {
    const { slog } = req.params;
    const productData = await Product.findOne({ slog });
 

    if (!productData) {
      return res.status(400).json("product not found");
    }

    res.status(200).json({
      title: productData.title,
      status: productData.status,
      price: productData.price,
      slog: productData.slog,
      discount: productData.discount,
      images: productData.images, // Ensure this is an array
      rating: productData.rating,
      stock: productData.stock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving products", message: error.message });
  }
};

module.exports = {
  createProduct,
  selectProductInfos,
  getProduct,
  updateProduct,
  DeleteProduct,
  getAllProducts,
};
