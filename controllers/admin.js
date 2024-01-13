const Product = require("../models/schemas/product");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.status(200).render("admin/products", {
      pageTitle: "admin products",
      path: "/admin/product",
      prods: products,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.status(200).render("admin/edit-product", {
    pageTitle: "admin products",
    path: "/admin/product/add",
    editing: false,
  });
};

exports.AddProductItem = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product({ title, imageUrl, description, price });
  product.save().then(() => {
    res.redirect("/admin/product");
  });
};

exports.getEditProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id).then((product) => {
    res.status(200).render("admin/edit-product", {
      pageTitle: "admin products",
      path: "/admin/product/add",
      editing: true,
      product,
    });
  });
};

exports.editProductItem = (req, res, next) => {
  const { productId, title, price, description, imageUrl } = req.body;
  Product.findById(productId).then((product) => {
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    product.save().then(() => {
      res.redirect("/admin/product");
    });
  });
};

exports.deleteProductItem = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteOne({ _id: productId }).then(() => {
    res.redirect("/admin/product");
  });
};
