var frameSize = [400, 600],
    delay = 1000,
    gap = 2000,
		frames = [],
    framesCount = 0,
    translateXs = [],
    transform = 'scale(0.75) matrix(0.994,-0.197,0.635,0.652,0,0)',
    transforms = [],
    docW, docH, vertMiddle, 
    scrolls = [400, 1000, 1600, 0],
    scrollsCount = scrolls.length,
    scrollDuration = 1200,
    scrollGap = 250 + scrollDuration;

$(document).ready(function(){
  docW = $(document).width();
  docH = $(document).height();
  
  setTimeout('animateTitle()', delay);
  
  var ae = $('.myframe');
  framesCount = ae.length;
  for(var i=0; i<framesCount; i++) {
  	frames[i] = ae.eq(i);
    $(frames[i]).width(docW+'px')
    	.height(docH+'px')
    	.css('z-index',100-i)
    	.prepend($(document.createElement('div')).addClass('overlap'));
  }
  $('iframe').height(Math.max.apply(Math,scrolls)+frameSize[1]+"px");
  vertMiddle = (docH - frameSize[1]) / 2;
  setTimeout('animate(0)', delay*2);
});

function animateTitle() {
  var title = $('#title'),
  		titleHeight = $(title).height();
  
  $(title).css('top',(docH-titleHeight)/2+"px")
  	.width(docW+"px")
    .removeClass('init');
  
  setTimeout(function(){
  	$(title).css('top','0px');
  }, delay);
}

function animate(i) {
  var _pos = (docW-frameSize[0])/2;
  for(var j=0; j<=i; j++) {
    translateXs[j] = _pos - ((i-j)*frameSize[0]/2);
    _pos += frameSize[0]/2;
  }
  
  setTimeout(function() {
    $(frames[i]).addClass('animate')
      .width(frameSize[0])
    	.height(frameSize[1])
    	.css("top",vertMiddle+"px");
    for(var j=0; j<framesCount; j++) {
      if(j!=i) {
        transforms[j] = 'translateX('+translateXs[j]+'px)' + transform;
      } else {
        transforms[j] = 'translateX('+translateXs[j]+'px)';
      }
      $(frames[j]).css('transform', transforms[j]);
    }
  	setTimeout(function() {
    	$(frames[i]).css('transform','translateX('+translateXs[i]+'px)' + transform );
    },gap);
    if(i<framesCount-1) {
  		setTimeout('animate(' + (i + 1) + ')', gap);
    } else {
  		setTimeout('scroll(0,0)', gap+gap);
    }
	}, gap);
}

function scroll(i, j) {
  $(frames[i]).animate({scrollTop: scrolls[j]}, {duration: scrollDuration, easing: 'swing'});
  if( j == scrollsCount - 1 ) {
    scrollGap = 0;
  }
  if( i < framesCount - 1 ) {
 		setTimeout('scroll(' + (i + 1) + ',' + j + ')', scrollGap );
  } else if( j < scrollsCount - 1 ) {
  	setTimeout('scroll(0,' + (j + 1) + ')', scrollGap );
  }
}