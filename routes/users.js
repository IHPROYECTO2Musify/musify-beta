const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const City = require("../models/CitiesEnum");
const Experience = require("../models/ExpEnum");
const Instrument = require("../models/InstrumentsEnum");
const bcryptSalt = 10;

userRoutes.get("/new-user", (req, res, next) => {
  res.render("users/new-user", {
    city: City,
    mainInstrument: Instrument,
    otherInstrument: Instrument,
    experience: Experience
  });
});

userRoutes.post("/new-user", (req, res, next) => {
    const username = req.body.username;
    const city = req.body.city;
    const description= req.body.description;
    const mainInstrument= req.body.mainInstrument;
    const otherInstrument= req.body.otherInstrument;
    const experience= req.body.experience;
});

module.exports = userRoutes;