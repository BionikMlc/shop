const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/schemas/user");
const {
  getSignUp,
  registerUser,
  logout,
  getLogin,
  login,
} = require("../controllers/auth");

const router = express.Router();

router.get("/signup", getSignUp);
router.post("/signup", registerUser);
router.get("/logout", logout);
router.get("/login", getLogin);
router.post("/login", login);

module.exports = router;
