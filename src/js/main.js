var module = (function() {
  var _private = {
    i: 5,
    get: function() {
      console.log('Текущее значение:' + this.i);
    },
    set: function(val) {
      this.i = val;
    },
    run: function() {
      console.log('процесс запущен');
    },
    jump: function() {
      console.log('резкое изменение');
    }
  };
  return {
    facade: function(args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  }
}());

module.facade({run:true, val:10}); // Текущее значение: 10, процесс запущен

























/*var controller = (function() {
  var
    options = {},
    data,
    user;

  function _receiveData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '../src/nodejs/data.json', false);
    xhr.send();
    if (xhr.status != 200) {
      // обработать ошибку
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      // вывести результат
      data = JSON.parse(xhr.response);
      user = data.user;
      console.log(user)
    }
  }

  return {
    init: function init() {_receiveData()},
    user: function () {
      return user;
    }
  };
})();

$(function() {


controller.init();
console.log(controller.user);
/*var b = controller.user.avatar;
console.log(b);
$('body').append('<img src= ' + b + '>');*/
/*
});

*/

