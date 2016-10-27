var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  var locals = {message: 'Express + Haml!!!!'};
  res.render('index.haml', {locals: locals});
});

module.exports = router;
