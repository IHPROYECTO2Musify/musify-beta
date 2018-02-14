const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const City = require("../models/CitiesEnum");
const Experience = require("../models/ExpEnum");
const Instrument = require("../models/InstrumentsEnum");
const bcryptSalt = 10;

//ensure login
const ensureLoggedIn = redirect_url => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(redirect_url);
    }
  };
};
//render new user profile
userRoutes.get("/new-user", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("users/new-user", {
    city: City,
    mainInstrumentList: Instrument,
    otherInstrument: Instrument,
    experience: Experience
  });
});

//save additional details
userRoutes.post(
  "/new-user",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const updates = ({
      username,
      city,
      description,
      mainInstrument,
      otherInstrument,
      experience
    } = req.body);
    console.log(updates);
    if (username === "" || mainInstrument === "" || city === "") {
      res.render("users/new-user", {
        message: "Los campos marcados con un asterisco son obligatorios"
      });
    }
    User.findByIdAndUpdate(req.user._id, updates, { new: true }, (err, user) => {
      if (err) {
        return next(err);
      }
      console.log(user);
      req.user = user;
      res.redirect("/users/activity");
    });
  }
);

userRoutes.get("edit/:id", (req, res, next) => {
  res.render("users/edit");
});

userRoutes.get("/activity", (req, res, next) => {
  res.render("users/activity");
});

module.exports = userRoutes;