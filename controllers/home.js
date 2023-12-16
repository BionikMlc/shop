const Product = require("../models/product");

const homeController = (req, res) => {
  Product.fetchAllProducts((products) => {
    res.status(200).render("shop/index", {
      pageTitle: "shop",
      path: "/",
      prods: products,
    });
  });
};

module.exports = homeController;
