const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/message");

exports.index_get = asyncHandler(function (req, res, next) {
  // if no logged in user
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }
  res.render("index", { title: "Members Forum", messages: [] });
});

// to add a message to forum
exports.index_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To add a message by the user");
});

exports.login_user_get = asyncHandler(function (req, res, next) {
  res.render("login", { title: "User login" });
});

exports.login_user_post = [
  body("username", "Username must be filled and with more than 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must be filled and have more than 4 characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("/login", {
        title: "User login",
        validationErrors: errors,
      });
    }

    const inUser = await User.findOne({ username: req.body.username });

    if (!inUser) {
      return res.render("/login", {
        title: "User login",
        error: "Username is invalid",
      });
    }

    const match = await bcrypt.compare(password, inUser.password);
    if (!match) {
      return res.render("/login", {
        title: "User login",
        error: "Password is invalid",
      });
    }

    // successful authentication
    res.redirect("/");
  }),
];

exports.create_user_get = asyncHandler(function (req, res, next) {
  res.render("sign-up", { title: "User sign-up" });
});

exports.create_user_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To add new user to db");
});
