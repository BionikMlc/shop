const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("shop/index", {
      pageTitle: "products",
      path: "/",
      prods: products,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`your id is ${id}`);
});

router.post("/:id", (req, res) => {});

module.exports = router;
