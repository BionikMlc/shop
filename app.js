require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const { product, admin, cart, auth } = require("./consts/paths");
const productsRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const indexRoute = require("./controllers/home");
const authMiddleware = require("./middleware/isAuth");

const notFoundController = require("./controllers/404");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
// Set up the static file server
server.use(express.static(path.join(__dirname, "public")));
server.use(authMiddleware);

server.use(product, productsRoutes);
server.use(admin, adminRoutes);
server.use(cart, cartRoutes);
server.use(auth, authRoutes);
server.get("/", indexRoute);

//ejs setup
//sets server engine
server.set("view engine", "ejs");
//set view folder from where express will get views
//this is not needed anymore, since express
//by default will look into the views folder
server.set("views", "views");

server.use(notFoundController.get404);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
};

start();
