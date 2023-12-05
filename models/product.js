const fs = require("fs");
const path = require("path");

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
  save() {}

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products?.find((product) => product.id === id);
      callback(product);
    });
  }

  static deleteById() {}

  static fetchAllProducts(callback) {
    getProductsFromFile(callback);
  }
};
