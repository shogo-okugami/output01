$(function () {

  var $window = $(window),
      $trigger = $('.js-trigger');
      
  //ハンバーガーメニュー
  $trigger.on('click', function () {
    $(this).toggleClass('is-active');
    $('.js-nav').toggleClass('is-active');
    if ($(this).hasClass('is-active')) {
      $('body').css({ 'overflow': 'hidden', 'height': '100%' });
    } else {
      $('body').css({ 'overflow': 'scroll', 'height': '100%' });
    }
  });

  $('.js-nav__item').on('click', function () {
    if ($window.width() <= 414) {
      $trigger.removeClass('is-active');
      $('.js-nav').removeClass('is-active');
      if ($('.js-nav').hasClass('is-active')) {
        $('body').css({ 'overflow': 'hidden', 'height': '100%' });
      } else {
        $('body').css({ 'overflow': 'scroll', 'height': '100%' });
      }
    }
  });

  var $panel = $('.js-panel'),
      panelWidth = $panel.width();
  $('.js-panel-backgroundImage').height(panelWidth);

  //スムーススクロール
  $("a[href^='#']:not([href='#'])").on('click', function () {
    var target = $($(this).attr("href")).offset().top,
      headerHeight = $('.js-header').innerHeight(),
      position = target - headerHeight;
    $("html, body").stop().animate({ scrollTop: position }, 1000, "swing");
    return false;
  });

  $('.js-home').on('click', function () {
    var bodyPos = $('body').offset().top;
    $("html, body").stop().animate({ scrollTop: bodyPos }, 1000, "swing");
    return false;
  });

});  