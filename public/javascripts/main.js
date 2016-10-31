var controller = (function() {
  var
    options = {},
    data;

  function _receiveData() {
    var _initReq = new XMLHttpRequest();
    _initReq.withCredentials = true;
    _initReq.open("GET", 'http://127.0.0.1:3000/users', true);
    _initReq.send();
    console.log(_initReq.response);
    data = _initReq.response;
    console.log(data);
  }

  return {
    init: function init() {_receiveData()}
  };
}());

$(function() {
  //controller.init();
  var users,
      offers;
  $.ajax({
    dataType: 'json',
    url: 'http://127.0.0.1:3000/users',
    success: function(jsondata){
      users = jsondata;
      console.log(users)
    }
  });
  $.ajax({
    dataType: 'json',
    url: 'http://127.0.0.1:3000/offers',
    success: function(jsondata){
      offers = jsondata;
      console.log(offers)
    }
  });

  $('.offers').load('http://127.0.0.1:3000/offerTemplate');
});
