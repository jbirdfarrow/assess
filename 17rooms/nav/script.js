(function(d) {
  var meny = Meny.create({
	      menuElement: d.querySelector( '.meny' ),
	      contentsElement: d.querySelector( '.contents' ),
      	position: Meny.getQuery().p || 'left',
      	height: 200,
      	overlap: 0,
      	width: 260,
      	threshold: 0
    });

    var button = d.getElementById('menu-button');
    button.addEventListener("click", function() {
	    if (meny.isOpen()) { meny.close(); } 
	    else { meny.open(); }
    }, false);
 })(document);