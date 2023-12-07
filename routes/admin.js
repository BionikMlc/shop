const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/product", (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("admin/products", {
      pageTitle: "admin products",
      path: "/admin/product",
      prods: products,
    });
  });
});
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
router.get("/product/edit/:id", (req, res, next) => {
  const { id } = req.params;
  Product.fetchAllProducts((products) => {
    const productData = products.find((p) => p.id === id);
    res.status(200).render("admin/edit-product", {
      pageTitle: "admin products",
      path: "/admin/product/add",
      editing: true,
      product: productData,
    });
  });
});
router.post("/product/edit", (req, res, next) => {
  const { productId, title, price, description, imageUrl } = req.body;
  Product.fetchAllProducts((products) => {
    const product = new Product(productId, title, imageUrl, description, price);
    product.save();
    res.redirect("/");
  });
});

router.post("/product/delete", (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId);
  res.redirect("/admin/product");
});

module.exports = router;