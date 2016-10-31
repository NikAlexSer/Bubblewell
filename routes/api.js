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
    console.log(offers);
    res.send(offers);
});

/**
 * Получение JSON юзеров
 **/
router.get('/api/users', function(req, res, next){
  console.log(users);
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

module.exports = router;

