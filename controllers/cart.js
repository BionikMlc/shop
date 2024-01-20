const Product = require("../models/schemas/product");

const calculateTotalPrice = (products) => {
  let total = 0;
  products.forEach((item) => {
    total = total + item.product.price * item.quantity;
  });
  return total;
};

exports.getCart = async (req, res, next) => {
  req.user
    .populate("cart.products.productId")
    .then((user) => {
      const products = user.cart.products.map((product) => {
        return { product: product.productId, quantity: product.quantity };
      });
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        totalPrice: calculateTotalPrice(products),
      });
    })
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product._id);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.deleteFromCart = (req, res, next) => {
  const { productId } = req.body;
  console.log("first", productId);
  req.user.deleteFromCart(productId).then(() => {
    res.redirect("/cart");
  });
};
