const express = require("express");
const path = require("path");

const { product } = require("./consts/routes");
const productsRoutes = require("./routes/products");
const homeRoutes = require("./routes/home");

const notFoundController = require("./controllers/404");

const server = express();
const PORT = 3000;

// Set up the static file server
server.use(express.static(path.join(__dirname, "public")));

server.use(product, productsRoutes);
server.use(homeRoutes);

//ejs setup
//sets server engine
server.set("view engine", "ejs");
//set view folder from where express will get views
//this is not needed anymore, since express
//by default will look into the views folder
server.set("views", "views");

server.use(notFoundController.get404);

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
