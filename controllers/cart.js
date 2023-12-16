const Product = require("../models/product");
const { getCart, addToCart, deleteItemById } = require("../models/cart");

exports.getCart = (req, res, next) => {
  getCart((cart) => {
    res.status(200).render("shop/cart", {
      pageTitle: "cart",
      path: "/cart",
      products: cart?.products || [],
      totalPrice: cart?.totalPrice || 0,
    });
  });
};

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.fetchAllProducts((products) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      res.redirect("/cart");
    }
  });
};

exports.deleteFromCart = (req, res, next) => {
  const { productId } = req.body;
  deleteItemById(productId);
  res.redirect("/cart");
};
