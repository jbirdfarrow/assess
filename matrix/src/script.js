/*ONLY JS IS FOR PAGE OVERLAY ON MENU HOVER*/

$(window).load(function(){
$('.megamenu').hover(function(){
    $('#overlay').fadeTo(200, 1);
},function(){
    $('#overlay').fadeTo(200, 0, function(){
        $(this).hide();
    });
});});

