const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/schemas/user");

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "register",
    path: "/signup",
  });
};

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, cart: [] });
  const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  user.save().then(() => {
    res.cookie("token", token);
    res.redirect("/");
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login",
    path: "/login",
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(async (user) => {
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const token = jwt.sign(
        { userId: user._id.toString() },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token);
      res.redirect("/");
    } else {
      res.render("auth/login", {
        pageTitle: "login",
        path: "/login",
        errorMessage: "incorrect username or password",
      });
    }
  });
};
