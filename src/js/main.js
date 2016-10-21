var controller = (function() {
  var
    options = {},
    data,
    user;

  function _receiveData() {
    var _initReq = new XMLHttpRequest();
    _initReq.open("GET", '../src/nodejs/data.json', false);
    _initReq.send();
    data = JSON.parse(_initReq.response);
    user = data.user;
    console.log(user);
    _initReq.abort();
  }

  return {
    init: function init() {_receiveData()}
  };
}());

$(function() {
  var lol;
  controller.init();
  $.ajax({
    type: "GET",
    url: '../src/nodejs/data.json',
    async: true,
    success: function (result) {
      lol = result
    }
  });

  console.log(lol)
});


/*
function controller(module) {
  $(function() {
    if (module.init) {
      module.init();
    }
  });
  return module;
}

var bubbleWell = controller(function() {
  return {
    init: function() {
      console.log('Ziga');
    }
  };
}());*/