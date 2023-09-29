const asyncHandler = require("express-async-handler");

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

exports.login_user_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To login user to app");
});

exports.create_user_get = asyncHandler(function (req, res, next) {
  res.render("sign-up", { title: "User sign-up" });
});

exports.create_user_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To add new user to db");
});
