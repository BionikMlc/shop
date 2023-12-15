const express = require("express");
const Product = require("../models/product");
const { getCart, addToCart, deleteItemById } = require("../models/cart");

const router = express.Router();

router.get("/", (req, res, next) => {
  getCart((cart) => {
    res.status(200).render("shop/cart", {
      pageTitle: "cart",
      path: "/cart",
      products: cart?.products || [],
      totalPrice: cart?.totalPrice || 0,
    });
  });
});
router.post("/", (req, res, next) => {
  const { productId } = req.body;
  Product.fetchAllProducts((products) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      res.redirect("/cart");
    }
  });
});
router.post("/delete", (req, res, next) => {
  const { productId } = req.body;
  deleteItemById(productId);
  res.redirect("/cart");
});

module.exports = router;
