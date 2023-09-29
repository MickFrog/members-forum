require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");
const MongoSessionStore = require("connect-mongo");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// MONGO DB SETUP //
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_KEY;

async function main() {
  await mongoose.connect(mongoDB);
}
// connect to mongoDB
main().catch((err) => console.log(err));

const User = require("./models/user");

// PASSPORT SETUP //
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      // on successful authentication
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    return done(error);
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/new", newFormRouter);

module.exports = app;
