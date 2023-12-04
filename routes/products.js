const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("welcome to root products");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`your id is ${id}`);
});

router.post("/:id", (req, res) => {});

module.exports = router;
