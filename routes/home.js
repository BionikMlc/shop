const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("shop/index", {
      pageTitle: "shop",
      path: "/",
      prods: products,
    });
  });
});

module.exports = router;
