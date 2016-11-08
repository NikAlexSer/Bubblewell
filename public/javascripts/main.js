var controller = (function() {
  var
      users,
      offers,
      activeUser = '6';

  /**
   * Получение общих данных и шаблона попапа с вызовом рендера
   * @private
     */
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
    var $dest = $('.popup');
    $.post('http://127.0.0.1:3000/api/popup/', {
      offers: JSON.stringify(offers[id])
    }, function(){
      $dest.load('http://127.0.0.1:3000/api/renderpopup/', function () {
        $dest.find('.add-feed .avatar').attr('src', users[parseInt(activeUser)].avatar);
      });
    })
  };

  /**
   * Предзагрузка данных при загрзуке js
   * @private
     */
  function _init() {
    _getOffers();
    _getUsers();
  };
  _init();


  /**
   * Навешивание ивентов
   * Зачем разделил все ивенты по функциям - для удобства
   * Сравненик с -1 - при отсутствии элемента в массиве функция indexOf возвращает -1
   * @private
     */
  function _setEventsHandlers() {
    /** not working yet =( **/
    function _socialCountersCheck(arr, id, dest) {
      if (arr.indexOf(activeUser, 0) === -1){
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
        $(this).toggleClass('comment-active')
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
                  message: $(this).val(),
                  visible: true
                }
              );
              _saveData(id);
            }
          }
        })
      });
    }
    function _newFeed() {
      $('.popup').on('focus', '.add-feed textarea', function () {
        var id = parseInt($(this).closest('.popup-content').data('number'));
        $(this).keypress(function (eventObject) {
          if ($(this).val()) {
            if (eventObject.which === 13) {
              offers[id].feeds.unshift(
                {
                  userID: activeUser,
                  message: $(this).val(),
                  visible: true
                }
              );
              _saveData(id);
              _getPopupTemplate(id);
            }
          }
        })
      });
    }
    function _likeBtnClick() {
      $('.offers').on('click', '.like', function () {
        var id = parseInt($(this).closest('.offer').data('number'));
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

    function _commentHover() {
      $('.offers').on('click', '.comments-item', function () {
        $('.delete', this).toggle()
      })
    }
    function _hideComment() {
      $('.offers').on('click', '.delete', function () {
        var id = parseInt($(this).closest('.offer').data('number')),
            commentID = parseInt($(this).closest('.comments-item').data('number'));
        console.log(offers[id].comments[commentID].visible)
        offers[id].comments[commentID].visible = false;
        _saveData(id);
      })
    }
    _commentBtnClick();
    _likeBtnClick();
    _addBtnClick();
    _togglePopup();
    _closePopup();
    _delBtnClick();
    _newComment();
    _newFeed();
    _commentHover();
    _hideComment();
  }

  /**
   * Проверка уже поставленных лайков текущим пользователем
   * @param id
   * @private
     */
  function _socialCheck(id) {
      if ((offers[id].alreadyAdd.indexOf(activeUser, 0) !== -1)) {
        $('#offerID-'+ id + ' .add').addClass('add-active');
      }
      if ((offers[id].alreadyLiked.indexOf(activeUser, 0) !== -1)) {
        $('#offerID-'+ id + ' .like').addClass('like-active')
      }
  }

  /**
   * Сохранение данных
   * Дважды отправляются оферы, ибо одиночный офер по id нужен для отрисовки тольки измененного офера,
   * а не всей страницы
   * @param id
   * @private
     */
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
