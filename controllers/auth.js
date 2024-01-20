exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "register",
    path: "/signup",
  });
};

exports.registerUser = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = new User({ name, email, password, cart: [] });
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
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user && user.password === password) {
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
