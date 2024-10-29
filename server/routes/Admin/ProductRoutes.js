const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  DeleteProduct,
} = require("../../controllers/Admin/productControler");
const router = express.Router();

router.route("/product").get(getProduct).post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:slog").put(updateProduct).delete(DeleteProduct);

module.exports = router;
