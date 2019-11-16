$(function (){

    var $window = $(window),
        $header = $('.page-header'),
        headerHeight = $header.height(),
        $imgArea = $('.js-img-area');

    $window.on('load', function(){

    function settingHeight(){
        
        var windowHeight = $window.height(),

            imgHeight = windowHeight - headerHeight ;

        $imgArea.css('height',imgHeight + 'px');
        }  
            settingHeight();

            $window.resize(function(){

            settingHeight();

        });
    });
    
    var name_flg = false,
        email_flg = false,
        message_flg = false;

    const MSG_TEXT_MAX = '20字以内で入力してください。';
    const MSG_EMPTY = '入力必須です。';
    const MSG_EMAIL_TYPE = 'emailの形式ではありません。';
    const MSG_TEXTAREA_MAX ='200文字以内で入力してください。';

    $('.valid-name').on('keyup', function(){

        var form_g = $(this).closest('.form-group');
        
        if($(this).val().length === 0){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_EMPTY);
        }else if($(this).val().length > 20){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_TEXT_MAX);
        }else{
          form_g.removeClass('has-error').addClass('has-success');
          form_g.find('.help-block').text('');
          name_flg = true;
        }
    });

    $('.valid-email').on('keyup', function(){

        var form_g = $(this).closest('.form-group');
        
        if($(this).val().length === 0){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_EMPTY);
        }else if($(this).val().length > 50 || !$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_EMAIL_TYPE);
        }else{
          form_g.removeClass('has-error').addClass('has-success');
          form_g.find('.help-block').text('');
          email_flg = true;
        }
    });

    $('.valid-textarea').on('keyup', function(){

      var form_g = $(this).closest('.form-group');
        
      if($(this).val().length === 0){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_EMPTY);
      }else if($(this).val().length > 200){
          form_g.removeClass('has-success').addClass('has-error');
          form_g.find('.help-block').text(MSG_TEXTAREA_MAX);
      }else{
          form_g.removeClass('has-error').addClass('has-success');
          form_g.find('.help-block').text('');
          message_flg = true;
      }
    });

    $header.each(function(){

      var $stickyHeader = $(this).find('.sticky-header'),
          stickyHeaderHeight = $stickyHeader.outerHeight();

          $stickyHeader.css({ top: '-' + stickyHeaderHeight + 'px' });

          $window.on('scroll', function(){
              
            if($window.scrollTop() > headerHeight){
               $stickyHeader.css({top:0});
              }else{
                $stickyHeader.css({ top: '-' + stickyHeaderHeight + 'px' });
              }
            });    
            $window.trigger('scroll')
    });

    $imgArea.each(function(){

      var $container = $(this),
          $fadeImg = $container.find('.js-fade-img'),
          $indicator = $container.find('.indicator'),
  
          imgCount = $fadeImg.length,
          currentIndex = 0,
          timer;

          function startTimer(){
            timer = setInterval(showNextImg,6000);
          }

          function stopTimer(){
            clearInterval(timer);
          }

          function showNextImg(){

            var nextIndex = (currentIndex + 1) % imgCount;

            $fadeImg.eq(currentIndex).stop().fadeOut(2000);

            $fadeImg.eq(nextIndex).stop().fadeIn(2000);

            currentIndex = nextIndex;

            updateNav();
          
            }

            function updateNav(){
              $indicator.find('.js-circle').removeClass('active-circle')
              .eq(currentIndex).addClass('active-circle');
            }
          
            $('.js-circle').on('click', function(){
                if( !$(this).hasClass('active-circle')){
                var nextIndex = ($(this).index());

                $fadeImg.eq(currentIndex).stop().fadeOut(2000);

                $fadeImg.eq(nextIndex).stop().fadeIn(2000);

                currentIndex = nextIndex;

                updateNav();

                stopTimer();

                startTimer();
                }

            });

            $('.js-navigation-next').on('click',function(){

              var nextIndex = (currentIndex + 1) % imgCount;

              $fadeImg.eq(currentIndex).stop().fadeOut(2000);

              $fadeImg.eq(nextIndex).stop().fadeIn(2000);

              currentIndex = nextIndex;

              updateNav();

              stopTimer();

              startTimer();

            });

            $('.js-navigation-prev').on('click',function(){

              if(currentIndex == 0){
                  nextIndex = 3
              }else{
                  nextIndex = currentIndex - 1;
              }

              $fadeImg.eq(currentIndex).stop().fadeOut(2000);

              $fadeImg.eq(nextIndex).stop().fadeIn(2000);

              currentIndex = nextIndex;

              updateNav();

              stopTimer();

              startTimer();

            });

            startTimer();
          
          });

          $('.js-toggle-sp-menu').on('click', function(){
            $(this).toggleClass('js-toggle-sp-menu-active');
            $('.js-toggle-sp-menu-target').toggleClass('nav-menu-active');
          });

          $('.js-nav-menu-link').on('click', function(){
            $('.js-toggle-sp-menu').toggleClass('js-toggle-sp-menu-active');
            $('.js-toggle-sp-menu-target').toggleClass('nav-menu-active');
          }) 

          $("a[href^='#']").on('click',function(){
          var href= $(this).attr("href"),
              target = $(href == "#" || href == "" ? 'html' : href),
              position = target.offset().top - headerHeight; 
          $("html, body").animate({scrollTop:position}, 500, "linear");
          return false;
   });
          
          var windowidth = $window.width(),
              headerPos = $header.offset().top;
          
          $window.on('load', function(){
          
            if(windowidth <= 650){
              
                
                $($imgArea).css('margin-top',headerHeight);
                $header.offset({top: headerPos,left: 0});
              }else{
                
                $imgArea.css('margin-top','0');
              }
          });
});  
