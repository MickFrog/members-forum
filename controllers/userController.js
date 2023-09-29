const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Message = require("../models/message");

exports.index_get = asyncHandler(async function (req, res, next) {
  // if no logged in user
  if (!req.user) {
    res.redirect("/login");
    return;
  }

  const messages = await Message.find({});

  res.render("index", { title: "Members Forum", messages: messages });
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
  body(
    "password",
    "Password must be filled and have more than 4 characters"
  ).isLength({ min: 4 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("login", {
        title: "User login",
        validationErrors: errors,
      });
    }

    const inUser = await User.findOne({ username: req.body.username });

    if (!inUser) {
      return res.render("login", {
        title: "User login",
        error: "Username is invalid",
      });
    }

    const match = await bcrypt.compare(req.body.password, inUser.password);
    if (!match) {
      return res.render("login", {
        title: "User login",
        error: "Password is invalid",
      });
    }

    // successful authentication
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next); // to ensure calling of the passport middleware
  }),
];

exports.create_user_get = asyncHandler(function (req, res, next) {
  res.render("sign-up", { title: "User sign-up" });
});

exports.create_user_post = [
  body("username", "Username must be filled and with more than 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body(
    "password",
    "Password must be filled and have more than 4 characters"
  ).isLength({ min: 4 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("/sign-up", {
        title: "User sign-up",
        validationErrors: errors,
      });
    }

    try {
      bcrypt.hash(req.body.password, 8, async (err, hashedPass) => {
        if (err) {
          err = new Error("Error hashing the password");
          return;
        }

        // create new user with hashed password
        const newUser = new User({
          username: req.body.username,
          password: hashedPass,
        });

        await newUser.save();
      });
    } catch (err) {
      return next(err);
    }

    // successful authentication
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next); // to ensure calling of the passport middleware
  }),
];

exports.logout_user = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
