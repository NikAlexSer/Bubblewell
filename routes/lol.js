/**
 * Created by Alexander Nikiforov on 28.10.2016.
 */
var express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/lol', function(req, res, next){
  res.render('offer.hbs');
});
module.exports = router;

