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
  res.render('offerAll.hbs', {
    offers: offers.offers,
    users: users.users
  });
});

/**
 * Получение обновленных данных сервером
 **/

var offer;

router.post('/api/like', function(req, res, next){
  offer = JSON.parse(req.body.offers);
  console.log("================================================");
  console.log(offer);
  console.log("================================================");
  res.sendStatus(200);
});

router.get('/api/renderoffer/', function(req, res, next){
  res.render('offer.hbs', {
    offers: offer,
    users: users.users
  });
});

router.get('/api/popup/', function(req, res, next){
  res.render('popup.hbs');
});

module.exports = router;

