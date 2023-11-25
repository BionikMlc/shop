const express = require("express");

const server = express();
const { product } = require("./consts/routes");
const productsRoutes = require("./routes/products");
const PORT = 3000;

server.use(product, productsRoutes);

server.use((req, res) => {
  res.status(404).send("page not found");
});

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
