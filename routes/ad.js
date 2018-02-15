const express = require("express");
const router = express.Router();
const City = require("../models/CitiesEnum");
const Instrument = require("../models/InstrumentsEnum");
const Types = require("../models/StylesEnum");
const debug = require("debug")("m2-0118-ironfunding:campaign");
const Ad = require("../models/Ads");

// Upload files with multer
// const multer = require('multer');
// const upload = multer({ dest: __dirname + '/../uploads' });

const ensureLoggedIn = redirect_url => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(redirect_url);
    }
  };
};

const checkOwnership = (req, res, next) => {
  Ad.findById(req.params.id, (err, ad) => {
    if (err) {
      return next(err);
    }
    if (!ad) {
      return next(new Error("Campaign does not exist"));
    }
<<<<<<< HEAD
=======

    if (ad.creator_id.equals(req.user._id)) {
      next();
    } else {
      return next(new Error("You cannot edit this campaign"));
    }
  });
};
  
router.get('/new', ensureLoggedIn('/auth/login'), (req, res) => {
    res.render('ad/new', { city: City, mainInstrument: Instrument, styles: Types });
});
>>>>>>> dev

    if (ad.creator_id.equals(req.user._id)) {
      next();
    } else {
      return next(new Error("You cannot edit this campaign"));
    }
  });
};

router.get("/new", ensureLoggedIn("/auth/login"), (req, res) => {
  res.render("ad/new", {
    city: City,
    mainInstrument: Instrument,
    styles: Types
  });
});

    const newAd = new Ad({
        title, types, description, styles, mainInstrument, city, audio, video, 
        creator_id: req.user._id,
        //imgUrl: req.file.filename
    });
    console.log(newAd)
    newAd.save().then(c => {
        //debug('Created ad');
        //req.flash('info', "Ad created")
        // res.redirect('/ad/list');
        res.redirect('/ad/show');
    })
    .catch(e => {
      // debug('Error creating ad');
      // req.flash('info', e.message)
      res.redirect("/");
    });

//attempting to redirect to created ad
router.get("/show", (req, res, next) => {
  res.render("ad/show");
})

router.get("/list", (req,res) => {
    Ad.find().exec((err, list) => {
      res.render("ad/list", {list: list});
    });
  });
});

router.post("/list", (req, res) => {
  const city = req.body.city;
  Ad.find({city: city}).exec((err, list) => {
    res.render("ad/list", { list: list, city: City });
  });
});

router.get("/show/:id", (req, res, next) => {
  Ad.findById(req.params.id)
    .populate("creator_id")
    .then(c => res.render("ad/show", { ad: c }))
    .catch(e => next(e));
});

router.get("/:id/edit", ensureLoggedIn("/login"), (req, res, next) => {
  Ad.findById(req.params.id, (err, ad) => {
    if (err) {
      return next(err);
    }
    if (!ad) {
      return next(new Error("404"));
    }
    return res.render("ad/edit", {
      ad: ad,
      city: City,
      mainInstrument: Instrument,
      styles: Types
    });
  });
});

router.post("/:id/edit", ensureLoggedIn("/login"), (req, res, next) => {
  const updates = ({
    title,
    types,
    description,
    styles,
    mainInstrument,
    audio,
    video,
    city
  } = req.body);

  Ad.findByIdAndUpdate(req.params.id, updates, (err, ad) => {
    if (err) {
      //req.flash('info','Errores al editar');
      return res.render("ad/edit", {
        ad,
        errors: ad.errors
      });
    }
    if (!ad) {
      return next(new Error("Error al editar, el anuncio no existe"));
    }
    //req.flash('info','Campaña editada!');
    return res.redirect(`/ad/show/${ad._id}`);
  });
});

router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  Ad.findById(id).exec((err, ad) => {
    ad.remove({}, err => {
      res.redirect("/ad/list");
    });
  });
});

module.exports = router;
