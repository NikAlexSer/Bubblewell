var controller = (function() {
  var
      users,
      offers,
      activeUser = '6';

  function _getUsers() {
    $.getJSON('http://127.0.0.1:3000/api/users', function(data){
      users = data.users;
    });
  };
  function _getOffers() {
    $.getJSON('http://127.0.0.1:3000/api/offers', function(data){
      offers = data;
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

  function _setEventsHandlers() {
    /** not working yet =( **/
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

    function _commentBtnClick() {
      $('.offers').on('click', '.com', function () {
        $('.comments').add('.add-comment').hide();
        $(this).css({color: "#5574ad"})
          .closest('.offer').toggleClass('offer-active')
      });
    }
    function _newComment() {
      $('.offers').on('focus', '.add-comment input', function () {
        var id = parseInt($(this).closest('.offer').data('number'));
        $(this).keypress(function (eventObject) {
          if ($(this).val()) {
            if (eventObject.which === 13) {
              offers[id].comments.unshift(
                {
                  userID: activeUser,
                  message: $(this).val()
                }
              );
              _saveData(id);
            }
          }
        })
      });
    }
    function _likeBtnClick() {
      $('.offers').on('click', '.like', function () {
        var id = parseInt($(this).closest('.offer').data('number'));
        $(this).css({color: "#b13897"});
        //socialCountersCheck(offers[id].alreadyLiked, id, offers[id].socialCounters.likeCounter);
        if (offers[id].alreadyLiked.indexOf(activeUser, 0) === -1) {
          offers[id].socialCounters.likeCounter = parseInt(offers[id].socialCounters.likeCounter) + 1;
          offers[id].alreadyLiked.push(activeUser);
          _saveData(id)
        }
      });
    }
    function _addBtnClick() {
      $('.offers').on('click', '.add', function () {
        var id = parseInt($(this).closest('.offer').data('number'));
        $(this).css({color: "#613a9f"});
        if (offers[id].alreadyAdd.indexOf(activeUser, 0) === -1){
          offers[id].socialCounters.addCounter = parseInt(offers[id].socialCounters.addCounter) + 1;
          offers[id].alreadyAdd.push(activeUser);
          _saveData(id)
        }
      });
    }
    function _delBtnClick() {
      $('.offers').on('click', '.fav', function () {
        var id = parseInt($(this).closest('.offer').data('number'));
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
        var id = parseInt($(this).closest('.offer').data('number'));
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
    _newComment();
  }


  function _socialCheck(id) {
      if ((offers[id].alreadyAdd.indexOf(activeUser, 0) !== -1)) {
        $('#offerID-'+ id + ' .add').addClass('add-active');
      }
      if ((offers[id].alreadyLiked.indexOf(activeUser, 0) !== -1)) {
        $('#offerID-'+ id + ' .like').addClass('like-active')
      }
  }
  function _saveData(id) {
    $.post('http://127.0.0.1:3000/api/save/', {
      offer: JSON.stringify(offers[id]),
      offers: JSON.stringify(offers)
    }, function(){
      $('#offerID-'+(id)).load('http://127.0.0.1:3000/api/renderoffer/', function () {
        $(this).find('.add-comment .avatar').attr('src', users[parseInt(activeUser)].avatar);
        _socialCheck(id);
      });
    })
  }


  return {
    render: function () {
      $('.offers').load('http://127.0.0.1:3000/api/render/', function () {
        $('.offer').each(function () {
          var id = parseInt($(this).data('number'));
          $(this).find('.add-comment .avatar').attr('src', users[parseInt(activeUser)].avatar);
          _socialCheck(id)
        });
      });
      _setEventsHandlers();
    }
  };
}());

$(function() {
  controller.render();
});
