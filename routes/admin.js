const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/product/add", (req, res, next) => {
  res.status(200).render("admin/edit-product", {
    pageTitle: "admin products",
    path: "/admin/product/add",
    editing: false,
  });
});
router.post("/product/add", (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
});

module.exports = router;
