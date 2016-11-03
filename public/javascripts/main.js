var controller = (function() {
  var
      users,
      offers,
      activeUser = '7';

  function _getUsers() {
    $.ajax({
      dataType: 'json',
      url: 'http://127.0.0.1:3000/api/users',
      success: function(jsondata){
        users = jsondata.users;
      }
    });
  };
  function _getOffers() {
    $.ajax({
      dataType: 'json',
      url: 'http://127.0.0.1:3000/api/offers',
      success: function(jsondata){
        offers = jsondata;
      }
    });
  };
  function _getPopupTemplate(id) {
    $.post('http://127.0.0.1:3000/api/popup/', {
      offers: JSON.stringify(offers[id])
    }, function(){
      $('.popup').load('http://127.0.0.1:3000/api/renderpopup/');
    })
  };

  function _init() {
    _getOffers();
    _getUsers();
  };
  _init();

  function _setEventsHandler() {
    function _commentBtnClick() {
      $('.offers').on('click', '.com', function () {
        $('.comments').add('.add-comment').hide();
        $(this).css({color: "#5574ad"})
          .closest('.offer').find('.add-comment').toggle()
          .closest('.offer').find('.comments').toggle();
      });
    }
    function socialCountersCheck(arr, id, dest) {
      if (arr.indexOf(activeUser, 0) === -1){
        console.log(dest);
        dest = parseInt(dest) + 1;
        arr.push(activeUser);
        _saveData(id)
      }
      else {
        return true
      }
    }
    function _likeBtnClick() {
      $('.offers').on('click', '.like', function () {
        var id = parseInt($(this).closest('.offer').data('number')) - 1;
        $(this).css({color: "#b13897"});
        socialCountersCheck(offers[id].alreadyLiked, id, offers[id].socialCounters.likeCounter);
        /*
        if (offers[id].alreadyLiked.indexOf(activeUser, 0) === -1){
          offers[id].socialCounters.likeCounter = parseInt(offers[id].socialCounters.likeCounter) + 1;
          console.log(offers[id].alreadyLiked.indexOf(activeUser, 0));
          offers[id].alreadyLiked.push(activeUser);
          _saveData(id)
        }
        else if (offers[id].alreadyLiked.indexOf(activeUser, 0)) {
          console.log(offers[id].alreadyLiked.indexOf(activeUser, 0));
          return true;
        }
        else {
          return true
        }
*/
      });
    }
    function _addBtnClick() {
      $('.offers').on('click', '.add', function () {
        var id = parseInt($(this).closest('.offer').data('number')) - 1;
        $(this).css({color: "#613a9f"});
        if (offers[id].alreadyAdd.indexOf(activeUser, 0) === -1){
          offers[id].socialCounters.addCounter = parseInt(offers[id].socialCounters.addCounter) + 1;
          console.log(offers[id].alreadyAdd.indexOf(activeUser, 0));
          offers[id].alreadyAdd.push(activeUser);
          _saveData(id)
        }
        else if (offers[id].alreadyAdd.indexOf(activeUser, 0)) {
          console.log(offers[id].alreadyAdd.indexOf(activeUser, 0));
          return true;
        }
        else {
          return true
        }
        _saveData(id)
      });
    }
    function _delBtnClick() {
      $('.offers').on('click', '.fav', function () {
        var id = parseInt($(this).closest('.offer').data('number')) - 1;
        $(this).css({color: "#113a9f"}).closest('.offer').hide();
        offers[id].visible = false;
        _saveData(id)
      });
    }
    function _closePopup() {
      $('.popup-bg').on('click', '.popup-close', function () {
        $('body').toggleClass('.scroll');
        $('.popup-bg').toggle();
      });
    }
    function _togglePopup() {
      $('.offers').on('click', '.btn-popup', function () {
        var id = parseInt($(this).closest('.offer').data('number')) - 1;
        $('.popup-bg').toggle();
        $('body').toggleClass('scroll');
        _getPopupTemplate(id);
      });
    }
    _commentBtnClick();
    _likeBtnClick();
    _addBtnClick();
    _togglePopup();
    _closePopup();
    _delBtnClick();
  }

  function _saveData(id) {
    $.post('http://127.0.0.1:3000/api/save/', {
      offer: JSON.stringify(offers[id]),
      offers: JSON.stringify(offers)
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
