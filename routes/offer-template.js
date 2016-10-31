/**
 * Created by Alexander Nikiforov on 28.10.2016.
 */
var express = require('express'),
    data = require('../data/offers.json');
    router = express.Router();

/* GET home page. */
router.get('/offerTemplate', function(req, res, next){
  console.log(data.offers);
  res.render('offer.hbs', {
    offers: data.offers
  });
});

module.exports = router;

