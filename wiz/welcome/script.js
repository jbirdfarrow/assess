var mqWidth = 680,
    scrollTrigger = 40,
    isMobile = null,
    burgerCheckbox = $('#humberger_check'), 
    hiddenMenu = $('.hidden_menu li'),
    slideBar = $('.menu_underline'),
    headerBar = $('.header_bar');

function sliderBarAnimation(){
  if ( $(window).width() > mqWidth ){
    if (isMobile === false) return;
    isMobile = false;
    hiddenMenu.off('mouseenter mouseleave').hover(
      // nmouseenter
      function(){
        var current = $(this),
            barColor = current.data('bar-color');
        slideBar.addClass('visible').css({
          'top':'auto',
          'left' : current.position().left,
          'background-color':barColor
        })
      },
      //mouseleave
      function(){
        slideBar.removeClass('visible');
      }
    );
  } else {
    if (isMobile === true) return;
    isMobile = true;
    hiddenMenu.off('mouseenter mouseleave').hover(
      // nmouseenter
      function(){
        var current = $(this),
            barColor = current.data('bar-color');
        slideBar.addClass('visible').css({
          'left':0,
          'top':current.offset().top + 60,
          'background-color':barColor
        });
      },
      //mouseleave
      function(){
        slideBar.css({'top':0}).removeClass('visible');
      }
    );
  }
}
$(window).on({
  'resize' : function(){
      sliderBarAnimation();
    },
  'scroll' : function(){
    if ($(window).scrollTop() > scrollTrigger){
      headerBar.addClass('show-bg');
    } else {
      headerBar.removeClass('show-bg');
    }
  }
});
(function(){
  sliderBarAnimation();
  
  hiddenMenu.on('click', function(){
    var current = $(this);
    current.addClass('selected');
    setTimeout(function(){
      current.removeClass('selected');
      burgerCheckbox.prop('checked',false);
    }, 400);
  });
  hiddenMenu.children('a:not([target]):not([href^="tel:"])').on('click', function(e){
    var url = $(this).attr("href");
    if (!url) return;
    e.preventDefault();
    setTimeout(function(){
      window.location = url;
    },400);
  });
})(jQuery);