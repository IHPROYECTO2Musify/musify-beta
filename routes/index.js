const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

//const Ad = require('../models/Ads');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/private', isLoggedIn, function(req, res, next) {
  res.render('private');
});


router.get('/onlyme', onlyMe, function(req, res, next) {
  res.render('private');
});

// router.get('/', function(req, res, next) {

//   Ad
//   .find({})
//   .populate('creator_id')
//   .then((ads) => {
//     console.log(ads);
//     res.render('index', { ads });
//   })
//   .catch(e => next(e));
  
// });


module.exports = router;
