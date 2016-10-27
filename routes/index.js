var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index.haml');
  next()
}, function (req, res, next) {
  res.render('offer.hbs');
});

module.exports = router;
