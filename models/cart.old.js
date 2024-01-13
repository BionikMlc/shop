const fs = require("fs");
const path = require("path");
const { generateRandomId } = require("../util/index");
const logFilePath = path.join(
  path.dirname(require.main.filename),
  "log",
  "cart.json"
);

const getCartFromFile = (callback) => {
  fs.readFile(logFilePath, (err, fileContent) => {
    if (err) {
      return callback(null);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class cart {
  static addToCart(product) {
    getCartFromFile((cart) => {
      if (cart) {
        const updatedCart = { ...cart };
        const isExistingProduct = cart.products.find(
          (p) => p.id === product.id
        );
        if (isExistingProduct) {
          const productIndex = cart.products.findIndex(
            (p) => p.id === product.id
          );
          updatedCart.products[productIndex].qty += 1;
          updatedCart.totalPrice =
            Number(updatedCart.totalPrice) + Number(product.price);
        } else {
          const productData = {
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1,
          };
          updatedCart.products.push(productData);
        }
        fs.writeFile(logFilePath, JSON.stringify(updatedCart), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        const productData = {
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1,
        };
        fs.writeFile(
          logFilePath,
          JSON.stringify({
            products: [productData],
            totalPrice: Number(productData.price),
          }),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
  }

  static deleteItemById(id) {
    getCartFromFile((cart) => {
      if (cart) {
        const updatedCart = { ...cart };
        const productInCart = cart.products.find((p) => p.id === id);
        if (productInCart) {
          const productIndex = cart.products.findIndex((p) => p.id === id);
          if (updatedCart.products[productIndex].qty > 1) {
            updatedCart.products[productIndex].qty -= 1;

            updatedCart.totalPrice =
              Number(updatedCart.totalPrice) - Number(productInCart.price);
          } else {
            updatedCart.products = updatedCart.products.filter(
              (p) => p.id === !id
            );
          }
        }
        fs.writeFile(logFilePath, JSON.stringify(updatedCart), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
  static getCart(callback) {
    getCartFromFile(callback);
  }
};
