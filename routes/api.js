var express = require('express'),
  offers = require('../data/offers.json'),
  helpers = require('handlebars-helpers')(),
  users = require('../data/users.json'),
  router = express.Router();

/**
 * Генерация начальной страницы
 **/
router.get('/', function(req, res, next){
  res.render('index.haml');
});

/**
 * Получение JSON офферов
**/
router.get('/api/offers', function(req, res, next){
    res.send(offers);
});

/**
 * Получение JSON юзеров
 **/
router.get('/api/users', function(req, res, next){
  res.send(users);
});

/**
 * Получение рендера шаблона офферов в хтмл
 **/
router.get('/api/render', function(req, res, next){
  console.log(users.users[1].firstName + ", Я твой отец!");
  res.render('offer.hbs', {
    offers: offers.offers,
    users: users.users
  });
});

/**
 * Получение обновленных данных сервером
 **/

var ziga;

router.post('/api/like', function(req, res, next){
  console.log(req.body.id, "TYT  BIL VIKTOR", req.body);
  // LIKE ++ PO ID
  var offer = getOfferById(req.body.id);
  console.log("================================================")
  console.log(offer)
  console.log("================================================")
  ziga = offer;
  res.sendStatus(200);
});

router.get('/api/renderlike/:id', function(req, res, next){
  var id = req.params.id;
  console.log("LOAD THIS " + id);
  console.log(ziga)
  res.render('offer.hbs', {
    offers: ziga,
    users: users.users
  });
});


function getOfferById(id) {
  //console.log(offers.offers[parseInt(id)-1], "ALL OFFERS");
  var result;
  offers.offers.forEach(function(offer, i) {
    if (offer.offerID == id)
    {
      result = offer;
    }
  });
  return result;
}
module.exports = router;

