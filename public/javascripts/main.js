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
  };
  function _getOffers() {
    $.ajax({
      dataType: 'json',
      url: 'http://127.0.0.1:3000/api/offers',
      success: function(jsondata){
        offers = jsondata.offers;
        console.log(offers)
      }
    });
  };
  function _getPopupTemplate() {
    $('.popup').load('http://127.0.0.1:3000/api/popup/');
  };

  function _init() {
    _getOffers();
    _getUsers();
  };
  _init();


  function _setEventsHandler() {
    _commentBtnClick();
    _likeBtnClick();
    _addBtnClick()
    _togglePopup();
    _closePopup();
  }

  function _closePopup() {
    $('.popup-bg').on('click', '.popup-close', function () {
      $('body').toggleClass('.scroll');
      $('.popup-bg').toggle();
    });
  }
  function _togglePopup() {
    $('.offers').on('click', '.btn-popup', function () {
      $('.popup-bg').toggle();
      $('body').toggleClass('scroll');
      _getPopupTemplate();
    });
  }

  //Доработать выключение комментов
  function _commentBtnClick() {
    $('.offers').on('click', '.com', function () {
      $('.comments').add('.add-comment').hide();
      $(this).css({color: "#5574ad"})
        .closest('.offer').find('.add-comment').toggle()
        .closest('.offer').find('.comments').toggle();
    });
  }
  function _likeBtnClick() {
    $('.offers').on('click', '.like', function () {
      var id = parseInt($(this).parent().parent().parent().data('number')) - 1;
      $(this).css({color: "#b13897"});
      offers[id].socialCounters.likeCounter = parseInt(offers[id].socialCounters.likeCounter) + 1;
      console.log(offers[id]);
      console.log(offers[id].socialCounters.likeCounter);
      _saveData(id)
    });
  }
  function _addBtnClick() {
    $('.offers').on('click', '.add', function () {
      var id = parseInt($(this).parent().parent().parent().data('number')) - 1;
      $(this).css({color: "#b13897"});
      offers[id].socialCounters.addCounter = parseInt(offers[id].socialCounters.addCounter) + 1;
      console.log(offers[id]);
      console.log(offers[id].socialCounters.addCounter);
      _saveData(id)
    });
  }

  function _saveData(id) {
    console.log(JSON.stringify(offers),id);
    $.post('http://127.0.0.1:3000/api/save/', {
      offers: JSON.stringify(offers[id])
    }, function(){
      $('#offerID-'+(id+1)).load('http://127.0.0.1:3000/api/renderoffer/');
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
