const jwt = require("jsonwebtoken");
const User = require("../models/schemas/user");

module.exports = (req, res, next) => {
  res.locals.errorMessage = "";
  res.locals.isAuthenticated = req.cookies?.token;
  res.locals.isAdmin = false;
  if (req.cookies?.token) {
    try {
      const decodedToken = jwt.verify(req.cookies?.token, process.env.JWT_KEY);
      console.log(decodedToken);
      User.findById(decodedToken.userId).then((user) => {
        if (user) {
          res.locals.isAdmin = user.isAdmin;
        }
        next();
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    next();
  }
};
