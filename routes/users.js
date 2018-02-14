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
    const updates = ({username, city, description, mainInstrument, otherInstrument, experience} = req.body);
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
//Send into private page
userRoutes.get("/activity", (req, res, next) => {
  res.render("users/activity");
});

//start the user edit process
userRoutes.get("/:id/edit", ensureLoggedIn('/login'), (req, res, next) => {
  User.findById(req.user._id, (err, us) => {
    if (err) { return next(err) }
    if (!ad) { return next(new Error("404")) }
  return res.render("users/edit", {city: City, mainInstrument: Instrument, otherInstrument: Instrument, experience: Experience});
  });
}); 

userRoutes.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
const updates = { imgUrl, username, city, description, styles, mainInstrument, otherInstrument, experience} = req.body;


User.findByIdAndUpdate(req.user._id, updates, { new: true }, (err, user) => {
  if (err) {
      //req.flash('info','Errores al editar');
      return res.render('users/edit', {
          us,
          errors: us.errors
      });
  }
  if (!us) {
      return next(new Error('Error al editar, el usuario no existe'));
  }
  //req.flash('info','Datos editados');
  req.user = user;
  return res.redirect(`/users/activity/${user._id}`);
});
});

module.exports = userRoutes;





      


// router.get("/:id/delete", (req, res) =>{
//   const id = req.params.id;
//   Ad.findById(id).exec((err, ad) => {
//     ad.remove({},(err) =>{
//       res.redirect("/ad/list");
//     })
    
//   });
// })