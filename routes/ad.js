const express = require("express");
const router = express.Router();
const City= require('../models/CitiesEnum');
const Instrument = require('../models/InstrumentsEnum');
const Types = require('../models/StylesEnum');
//const debug = require('debug')('m2-0118-ironfunding:campaign');
const Ad = require('../models/Ads');

// Upload files with multer
// const multer = require('multer');
// const upload = multer({ dest: __dirname + '/../uploads' });

const ensureLoggedIn = (redirect_url) => {
    return (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect(redirect_url)
        }
    }
}

const checkOwnership = (req, res, next) => {
    Ad.findById(req.params.id, (err, ad) => {
      if (err){ return next(err) }
      if (!ad){ return next(new Error('Campaign does not exist')) }
  
      if (ad.creator_id.equals(req.user._id)){
        next()
      } else {
        return next(new Error('You cannot edit this campaign'))
      }
    });
  }
  
router.get('/new', ensureLoggedIn('/auth/login'), (req, res) => {
    res.render('ad/new', { city: City, mainInstrument: Instrument, styles: Types });
});

router.post('/new', [ensureLoggedIn('/auth/login')], (req, res, next) => {
   // , upload.single('image')

    const { title, types, description, styles, city} = req.body;

    const newCampaign = new Campaign({
        title, types, description, styles, city,
        // We're assuming a user is logged in here
        // If they aren't, this will throw an error
        creator_id: req.user._id,
        imgUrl: req.file.filename
    });

    newAd.save().then(c => {
        debug('Created ad');
        req.flash('info', "Ad created")
        res.redirect('/');
    })
        .catch(e => {
            debug('Error creating ad');
            req.flash('info', e.message)
            res.redirect('/ad/new');
        })
});


// router.get('/:id', (req, res, next) => {
//     Ad.findById(req.params.id).populate('creator_id')
//         .then(c => res.render('ad/show', { ad: c }))
//         .catch(e => next(e));
// });

// router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
//     Ad.findById(req.params.id, (err, ad) => {
//         if (err) { return next(err) }
//         if (!ad) { return next(new Error("404")) }
//         return res.render('ad/edit', { ad, types: TYPES })
//     });
// });


// router.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
//     const updates = {
//         title: req.body.title,
//         goal: req.body.goal,
//         description: req.body.description,
//         category: req.body.category,
//         deadline: req.body.deadline
//     };

//     Campaign.findByIdAndUpdate(req.params.id, updates, (err, campaign) => {
//         if (err) {
//             req.flash('info','Errores al editar');
//             return res.render('campaign/edit', {
//                 campaign,
//                 errors: campaign.errors
//             });
//         }
//         if (!campaign) {
//             return next(new Error('Error al editar, la campaña no existe'));
//         }
//         req.flash('info','Campaña editada!');
//         return res.redirect(`/campaign/${campaign._id}`);
//     });
// });

// router.get('/:id/pledge/:amount',(req,res)=>{
//     Campaign.findById(req.params.id)
//         .then(c => {
//             c.totalPledged += parseInt(req.params.amount)
//             return c.save();
//         })
//         .then( c => {
//             res.json({
//                 status:"succeded",
//                 current: c.totalPledged
//             })
//         })
//         .catch(e => next(e));
// })

module.exports = router;