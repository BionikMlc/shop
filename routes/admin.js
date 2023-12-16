const express = require("express");
const router = express.Router();
const {
  getProducts,
  getAddProduct,
  getEditProduct,
  editProductItem,
  AddProductItem,
  deleteProductItem,
} = require("../controllers/admin");

router.get("/product", getProducts);
router.get("/product/add", getAddProduct);
router.post("/product/add", AddProductItem);
router.get("/product/edit/:id", getEditProduct);
router.post("/product/edit", editProductItem);
router.post("/product/delete", deleteProductItem);

module.exports = router;
