const express = require("express");
const { getCart, addToCart, deleteFromCart } = require("../controllers/cart");
const { isLoggedin } = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isLoggedin, getCart);
router.post("/", isLoggedin, addToCart);
router.post("/delete", isLoggedin, deleteFromCart);

module.exports = router;
