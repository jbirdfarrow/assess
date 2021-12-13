(function (win, doc) {

  var wrap = doc.getElementById('wrap'),
      items = Array.prototype.slice.call(wrap.getElementsByTagName('div'));
  
  var wrapHeight;
  
  function setHeight() {
  
    wrapHeight = win.innerHeight;
    wrap.style.height = wrapHeight + 'px';
  
  }
  
  function skewTiles(evnt) {
  
    items.forEach(function (item, i) {
    
      var itemHeight = item.offsetHeight + 40,
          offsetTopCount = Math.round((wrap.scrollTop - itemHeight / 4) / itemHeight),
          scrollTopOffset = Math.round((wrapHeight + itemHeight / 4) / itemHeight),
          offsetBottomCount = offsetTopCount + scrollTopOffset,
          atBottom = wrap.scrollHeight - wrapHeight - wrap.scrollTop;
      
      if ( i <= offsetTopCount && wrap.scrollTop ) {
        item.classList.add('top');
      } else {
        item.classList.remove('top');
      }
      
      if ( i >= offsetBottomCount && atBottom ) {
        item.classList.add('bottom');
      } else {
        item.classList.remove('bottom');
      }
    
    });
  
  }
  
  win.addEventListener('load', setHeight, false);
  win.addEventListener('resize', setHeight, false);
  wrap.addEventListener('scroll', skewTiles, false);
  
})(window, document);