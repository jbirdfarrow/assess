/* WIZARD PARTE RESPONSIVE*/
/* FUNZIONI */
function elementCheck() {
  
  /* PER OGNI ELEMENTO POPOLA ARRAY E CONTROLLA I LIMITI */
  $('.wizard').each(function(index) {

   /* TROVA ID ELEMENTO */
    var elementID = $(this).attr('id');
    
    /* CERCA ELEMENTO CON QUELL'ID SULL' ARRAY myLIMITS */
    var found = _.find(myLimits, function(l){
      return l.key == elementID;
    });
       
    /* SE NON LO TROVA GIA' INSERITO LO AGGIUNGE */
    if(!found){
      myLimits.push(
        {
          key: elementID,
          value: null
        }
     );
    }
    
    var contWidth = parseInt($(this).children('.wizard-header').outerWidth(true));

    limitFinder(elementID,contWidth);
  
  
  });
}

function stepNumber() {
     $('.wizard').each(function(index) {
       
    var elementID = $(this).attr('id');
    
        var wizardStep = $('#' + elementID + ' .wizard-header li').length;
        
          $('#' + elementID + ' .wizard-step-number').append('<em>&#47;' + wizardStep + '</em>');
  
});
}

function limitFinder (elementID,contWidth) {
  
    var limitWidth = 0;
  
      /* CERCA ELEMENTO CON QUELL'ID SULL' ARRAY myLIMITS */
      var found = _.find(myLimits, function(l){
      return l.key == elementID;
    });
  
      /* IMPOSTA IL VALORE DI LIMITWIDTH CON QUELLO CHE TROVA NELL'ARRAY se lo trova e non è NULL */
    if(found && found.value){
      limitWidth = found.value;
    }
  
  /* ALTRIMENTI LO CALCOLA ONTHEFLY */
  else{
     $('#'+ elementID + ' .wizard-header-item').each(function( index2 ) {
    
      
       
      var thisItem = parseInt($(this).outerWidth(true));
 
      limitWidth = thisItem + limitWidth;
       
    
         
    
      });
    }
 /* console.log(limitWidth); */
  changeLayout(elementID,contWidth,limitWidth);
  
 }
                                   
function changeLayout(elementID,contWidth,limitWidth) {
       if (contWidth < limitWidth) {
       
             $('#' + elementID + ' .wizard-header').addClass('wizard-header-mini');
             
             /* LANCIA AGGIORNAMENTO ARRAY CON LIMITE TROVATO SE IN PRECEDENZA NULLO */           
             /* CERCA ELEMENTO CON QUELL'ID SULL' ARRAY myLIMITS */
              var found = _.find(myLimits, function(l){
                return l.key == elementID;
              });
         
          found.value = limitWidth;
              

    }
    else {
    
       if($('#' + elementID + ' .wizard-header').length) {
       
       $('#' + elementID + ' .wizard-header').removeClass('wizard-header-mini');
       }
    }
       
     }                                  
/* FINE FUNZIONI */

/* AL CARICAMENTO PAGINA */



/* DEFINIRE ARRAY */
var myLimits = [];

/* LANCIO FUNZIONE CONTEGGIO STEP PER OGNI WIZARD */
stepNumber()

/* LANCIO FUNZIONE CHECK SUGLI ELEMENTI WIZARD */
elementCheck()

/* AL RESIZE PAGINA */
$(window).resize(function() {
 
  /* LANCIO FUNZIONE CHECK SUGLI ELEMENTI WIZARD */
 elementCheck()
 
});
/* WIZARD PARTE PULSANTI */
/* FUNZIONI */

function buttonNextPrev (wizardId,buttonNum,buttonAct) {
  
  var elementID = '#' + wizardId;
  
  $(elementID + ' .wizard-header-item').removeClass('js-active');
   $(elementID + ' .wizard-content-wrapper').removeClass('js-active');
 

  if (buttonAct == 'next') {

             var nextElement = buttonNum + 1;
             var sliderMov = (-buttonNum * 100).toString();
    
                $(elementID + ' .wizard-header-item[data-order=' + buttonNum + ']').addClass('validated');

            $(elementID + ' .wizard-header-item[data-order=' + nextElement + ']').addClass('js-active');

              $(elementID + ' .wizard-content-wrapper[data-order=' + nextElement + ']').addClass('js-active ');
    
               $(elementID + ' .wizard-content-list').css('left', sliderMov +'%');   
    
  }
      
   if (buttonAct == 'prev') {
         var prevElement = buttonNum - 1;
        var sliderMov = (-(buttonNum - 2) * 100).toString();
     
            $(elementID + ' .wizard-header-item[data-order=' + prevElement + ']').addClass('js-active');
                   $(elementID + ' .wizard-content-wrapper[data-order=' + prevElement + ']').addClass('js-active');
                    $(elementID + ' .wizard-content-list').css('left', sliderMov +'%');    

}
}

/* EVENTI */
$('.wizard-body-footer button[data-action]').on('click',function() {
 
  var wizardId = $(this).parents('.wizard').attr('id');
  var buttonNum = parseInt($(this).attr('data-order'));
  var buttonAct = $(this).attr('data-action');
  
  buttonNextPrev (wizardId,buttonNum,buttonAct);
  
});