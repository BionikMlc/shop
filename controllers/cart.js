const Product = require("../models/schemas/product");
const Cart = require("../models/schemas/cart");

exports.getCart = (req, res, next) => {
  Cart.findById(process.env.CART_ID).then((cart) => {
    res.status(200).render("shop/cart", {
      pageTitle: "cart",
      path: "/cart",
      products: cart.products,
      totalPrice: 0,
    });
  });
};

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;
  Cart.findById(process.env.CART_ID).then((cart) => {
    Product.findById(productId).then((product) => {
      const isProductInCart = cart.products.find((item) => {
        return item.product._id.toString() === productId;
      });
      if (isProductInCart) {
        const index = cart.products.findIndex(
          (item) => item.product._id.toString() === productId
        );
        cart.products[index].quantity += 1;
      } else {
        cart.products.push({ product, quantity: 1 });
      }
      cart.save().then(() => {
        res.redirect("/cart");
      });
    });
  });
};

exports.deleteFromCart = (req, res, next) => {
  const { productId } = req.body;
  Cart.findById(process.env.CART_ID).then((cart) => {
    const productInCart = cart.products.find(
      (item) => item._id.toString() === productId
    );
    if (productInCart.quantity > 1) {
      const index = cart.products.findIndex(
        (item) => item._id.toString() === productId
      );
      cart.products[index].quantity -= 1;
    } else {
      const updatedCart = cart.products.filter(
        (item) => item._id.toString() !== productId
      );
      cart.products = [...updatedCart];
    }
    cart.save().then(() => {
      res.redirect("/cart");
    });
  });
};
