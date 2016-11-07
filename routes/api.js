var express = require('express'),
  offerZ = require('../data/offers.json'),
  helpers = require('handlebars-helpers')(),
  users = require('../data/users.json'),
  fs = require('fs'),
  offers = offerZ,
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
    offers: offers,
    users: users.users
  });
});


/**
 * Получение обновленных данных сервером и последующая отправка шаблона на клиент
 **/
var offer;
router.post('/api/save', function(req, res, next){
  offer = JSON.parse(req.body.offer);
  offers = JSON.parse(req.body.offers);
  fs.writeFile('../data/offers.json',req.body.offers);
  res.sendStatus(200);
});

router.get('/api/renderoffer/', function(req, res, next){
  res.render('offer.hbs', {
    offers: offer,
    users: users.users
  });
});


/**
 * Получение шаблона попапа по id и отправка его на клиент
 */
var popup;
router.post('/api/popup/', function(req, res, next){
  popup = JSON.parse(req.body.offers);
  res.sendStatus(200);
});

router.get('/api/renderpopup/', function(req, res, next){
  res.render('popup.hbs', {
    offers: popup,
    users: users.users
  });
});
module.exports = router;

