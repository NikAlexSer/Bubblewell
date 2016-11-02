var controller = (function() {
  var
    users,
    offers;

  function _getUsers() {
    $.ajax({
      dataType: 'json',
      url: 'http://127.0.0.1:3000/api/users',
      success: function(jsondata){
        users = jsondata.users;
        console.log(users)
      }
    });
  }
  function _getOffers() {
    $.ajax({
      dataType: 'json',
      url: 'http://127.0.0.1:3000/api/offers',
      success: function(jsondata){
        offers = jsondata.offers;
        console.log(offers)
      }
    });
  }

  function _init() {
    _getOffers();
    _getUsers();
  }
  _init();

  function _setEventsHandler() {
    $('.offers').on('click', '.com', function () {
      $(this).css({color: "#5574ad"}).parent().parent().parent().find('.add-comment').toggle();
    });
    $('.offers').on('click', '.like', function () {
      var lol = parseInt($(this).parent().parent().parent().attr('id')) - 1;
      $(this).css({color: "#b13897"});
      offers[lol].socialCounters.likeCounter = parseInt(offers[lol].socialCounters.likeCounter) + 1;
      console.log(offers[lol]);
      console.log(offers[lol].socialCounters.likeCounter);
      _saveData($(this).parent().parent().parent().attr('id'))
    });
  }

  function _saveData(lol) {
    console.log(JSON.stringify(offers),lol);
  //   $.ajax({
  //     type: 'POST',
  //     url: "http://127.0.0.1:3000/api/save",
  //     data: JSON.stringify(offers),
  //     dataType: "JSON",
  //     success: function () {
  //       console.log('Ziga');
  //     }
  // });
    
    $.post('http://127.0.0.1:3000/api/like/', {
      id: lol
    }, function(){
      console.log("AZAZAAZAZAZAZ", lol);
      $('.offers #'+lol).replaceWith().load('http://127.0.0.1:3000/api/renderlike/' + lol);
    })
  }
  return {
    render: function () {
      $('.offers').load('http://127.0.0.1:3000/api/render/');
      _setEventsHandler();
    }
  };
}());

$(function() {

  controller.render();

});
