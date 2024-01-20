const jwt = require("jsonwebtoken");
const User = require("../models/schemas/user");

exports.authenticate = (req, res, next) => {
  res.locals.errorMessage = "";
  res.locals.isAuthenticated = req.cookies?.token;
  res.locals.isAdmin = false;
  if (req.cookies?.token) {
    try {
      const decodedToken = jwt.verify(req.cookies?.token, process.env.JWT_KEY);
      User.findById(decodedToken.userId).then((user) => {
        if (user) {
          res.locals.isAdmin = user.isAdmin;
          req.user = user;
        }
        next();
      });
    } catch (err) {
      console.log(err);
      res.clearCookie("token");
      res.redirect("/");
    }
  } else {
    next();
  }
};
exports.isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
