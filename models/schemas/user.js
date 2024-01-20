const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (productId) {
  //check if the product is existing in cart
  const productIndex = this.cart.products.findIndex(
    (product) => productId.toString() === product.productId.toString()
  );
  const updatedCart = [...this.cart.products];
  if (productIndex >= 0) {
    updatedCart[productIndex].quantity += 1;
  } else {
    updatedCart.push({
      productId,
      quantity: 1,
    });
  }
  this.cart.products = updatedCart;
  this.save();
};
userSchema.methods.deleteFromCart = async function (productId) {
  //check if the product is existing in cart
  const productIndex = this.cart.products.findIndex((product) => {
    return productId.toString() === product.productId.toString();
  });
  let updatedCart = [...this.cart.products];
  if (productIndex >= 0) {
    if (updatedCart[productIndex].quantity - 1 < 1) {
      updatedCart = updatedCart.filter(
        (product) => product.productId.toString() !== productId.toString()
      );
    } else {
      updatedCart[productIndex].quantity -= 1;
    }
  }
  this.cart.products = updatedCart;
  this.save();
};

module.exports = mongoose.model("User", userSchema);
