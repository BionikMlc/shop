const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("shop/product-list", {
      pageTitle: "products",
      path: "/products",
      prods: products,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id, (foundProduct) => {
    if (foundProduct) {
      return res.status(200).render("shop/product-detail", {
        pageTitle: foundProduct.title,
        path: "/products",
        product: foundProduct,
      });
    }
    res.status(404).redirect("/404");
  });
});

router.post("/:id", (req, res) => {});

module.exports = router;
