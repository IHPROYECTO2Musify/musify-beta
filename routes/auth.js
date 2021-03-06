const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport')
const User = require("../models/User");
const City= require('../models/CitiesEnum');
const Instrument = require('../models/InstrumentsEnum');
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", { city: City , mainInstrument: Instrument});
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const city = req.body.city;
  const mainInstrument= req.body.mainInstrument;

  console.log(username, password)

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      city,
      mainInstrument
    })
        .save()
        .then(user => {
          req.login(user, err => {
            if (err)
              return res.render("auth/signup", {
              });
            req.user = user;
            res.redirect("/users/new-user");
          });
        });
   });
});

// handle login and send user to his private page
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: ("/users/activity"),
  failureRedirect: ("/auth/login"),
}));

authRoutes. post("/login, ")

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;