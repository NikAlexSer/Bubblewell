var express = require('express'),
    router = express.Router(),
    data = require('../data/users.json');

/* GET users.json. */
router.get('/users', function(req, res, next){
  console.log(data);
  res.send(data);
});

module.exports = router;
