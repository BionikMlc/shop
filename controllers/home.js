const Product = require("../models/schemas/product");

const homeController = (req, res) => {
  Product.find().then((products) => {
    res.status(200).render("shop/index", {
      pageTitle: "shop",
      path: "/",
      prods: products,
    });
  });
};

module.exports = homeController;
