const fs = require("fs");
const path = require("path");
const { generateRandomId } = require("../util/index");
const logFilePath = path.join(
  path.dirname(require.main.filename),
  "log",
  "product.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(logFilePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === this.id);
      if (product) {
        const productIndex = products.findIndex((p) => p.id === this.id);
        products[productIndex] = {
          id: this.id,
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          price: this.price,
        };
        fs.writeFile(logFilePath, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        products.push({
          id: generateRandomId(),
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          price: this.price,
        });
        fs.writeFile(logFilePath, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products?.find((product) => product.id === id);
      callback(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(logFilePath, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAllProducts(callback) {
    getProductsFromFile(callback);
  }
};
