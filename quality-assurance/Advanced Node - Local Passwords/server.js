"use strict";

const express = require("express");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const pug = require("pug");
const app = express();
const session = require("express-session");
const passport = require("passport");
const ObjectID = require("mongodb").ObjectID;
const mongo = require("mongodb").MongoClient;
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const routes = require("./routes.js");
const auth = require("./auth.js");

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.route("/").get((req, res) => {
  //Change the response to render the Pug template
  res.render(process.cwd() + "/views/pug/index", {
    title: "Home Page",
    message: "Please login",
    showLogin: true,
    showRegistration: true,
  });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongo.connect(process.env.DATABASE, (err, db) => {
  if (err) {
    console.log("Database Error:" + err);
  }
  if (db) {
    console.log("Database connection successful");
  }
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  routes(app, db);
  auth(app, db);

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + process.env.PORT);
  });
});
