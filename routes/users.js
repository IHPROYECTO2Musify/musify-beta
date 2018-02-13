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
const ensureLoggedIn = (redirect_url) => {
    return (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect(redirect_url)
        }
    }
}

userRoutes.get("/new-user", ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render("users/new-user", {
    city: City,
    mainInstrument: Instrument,
    otherInstrument: Instrument,
    experience: Experience
  });
});

userRoutes.post("/new-user", ensureLoggedIn('/auth/login'), (req, res, next) => {

    const {username, city, description, mainInstrument, otherInstrument, experience} = req.body;
});

module.exports = userRoutes;

/*

router.get("/profile/:id/edit",(req,res,next) => {
  const userId = req.params.id;
  User.findById(userId).exec().then( user => {
    console.log({user})
    res.render("profiles/edit", {user});
  }).catch(e => next(e))
});

router.post("/profile/:id/edit",(req,res,next) => {
  const userId = req.params.id;
  const currentUser = req.session.currentUser;

  const name = req.body.name;


  const updates = {name};
  
  if (req.body.username != ""){
    updates.username = req.body.username;
  }

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err){ return next(err); }
    res.redirect(`/`);
  });
});

router.get("/profile/:id", (req,res,next) => {
  const userId = req.params.id;
  const currentUser = req.session.currentUser;

  User.findById(userId).exec().then( user => {
    res.render("profiles/show", {user: user, currentUser : currentUser});
  }).catch(e => next(e))
});

  module.exports = router;
  */