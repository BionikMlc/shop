const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("shop/product-list", {
      pageTitle: "products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getProductById = (req, res) => {
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
};
