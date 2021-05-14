function abrirCerrar(id, hd){
  var sec = document.getElementById(id);
  var hdr = document.getElementById(hd);
  var div = document.getElementsByTagName('div');
  var h3 = document.getElementsByTagName('h3');
  
  if(sec.className == "activa"){
	  sec.className = "inactiva";
	  hdr.className = "inactiva";
  } else {   
    for(var x=1,y=0; x<10; x++,y++){
    	div[x].className = "inactiva";
    	h3[y].className = "inactiva";
    }   
    setTimeout(function(){
			sec.className = "activa";
    },300);
    hdr.className = "activa";
  }
}