const express = require("express");
const router = express.Router();

const Message = require("../models/message");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", userController.index_get);

// POST new message to db
router.post("/", userController.index_post);

// GET user login
router.get("/login", userController.login_user_get);

// POST request to login user to app
router.post("/login", userController.login_user_post);

// GET new user sign up
router.get("/sign-up", userController.create_user_get);

// POST new user to db
router.post("/sign-up", userController.create_user_post);

module.exports = router;
