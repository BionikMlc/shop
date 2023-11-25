const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("welcome to root products");
});

module.exports = router;
