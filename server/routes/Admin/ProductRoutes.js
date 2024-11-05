const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  DeleteProduct,
  selectProductInfos,
} = require("../../controllers/Admin/productControler");
const router = express.Router();

router.route("/product").get(getProduct).post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/productInfo/:slog").get(selectProductInfos);
router.route("/product/:slog").put(updateProduct).delete(DeleteProduct);

module.exports = router;
