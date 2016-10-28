var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    data = require('./routes/data'),
    routes = require('./routes/index'),
    lol = require('./routes/lol'),
    logger = require('morgan'),
    engines = require('consolidate'),
    app = express();

// view engine setup
app.engine('haml', engines.haml);
app.engine('hbs', engines.handlebars);
app.set('views', path.join(__dirname, 'views'));

// requests and response monitor
app.use(logger('dev'));

// styles compilation
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  //outputStyle: "compressed"
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/', data);
app.use('/', lol);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// dev error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.hbs', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.hbs', {
    message: err.message,
    error: {}
  });
});

// export app in global variables
module.exports = app;
