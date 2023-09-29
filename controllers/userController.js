const asyncHandler = require("express-async-handler");

exports.index_get = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To get all messages");
});

exports.index_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To add a message by the user");
});

exports.login_user_get = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To get new user login form");
});

exports.login_user_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To login user to app");
});

exports.create_user_get = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To get new user create form");
});

exports.create_user_post = asyncHandler(function (req, res, next) {
  res.send("NOT IMPLEMENTED: To add new user to db");
});
