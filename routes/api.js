var express = require('express'),
    router = express.Router(),
    data = require('../data/offers.json');

/* GET users.json. */
router.get('/offers', function(req, res, next){
    console.log(data);
    res.send(data);
});

module.exports = router;

