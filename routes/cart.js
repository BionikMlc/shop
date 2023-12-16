const express = require("express");
const { getCart, addToCart, deleteFromCart } = require("../controllers/cart");

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.post("/delete", deleteFromCart);

module.exports = router;
