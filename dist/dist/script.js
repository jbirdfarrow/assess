var sidebarState = sessionStorage.getItem('sidebarState');

windowWidth = $(window).width();

$(window).resize(function() {
  windowWidth = $(window).width();

  if( windowWidth < 992 ){ //992 is the value of $screen-md-min in boostrap variables.scss
        $('#main-section').removeClass('sidebar-expanded').addClass('sidebar-collapsed');
        $('#toggle-collapse').removeClass('glyphicon-circle-arrow-left').addClass('glyphicon-circle-arrow-right');
    }
    else{
        if(sidebarState){
            $('#main-section').addClass('sidebar-collapsed').removeClass('sidebar-expanded'); 
            $('#toggle-collapse').removeClass('glyphicon-circle-arrow-left').addClass('glyphicon-circle-arrow-right');
        }
        else{
            $('#main-section').addClass('sidebar-expanded').removeClass('sidebar-collapsed'); 
            $('#toggle-collapse').removeClass('glyphicon-circle-arrow-right').addClass('glyphicon-circle-arrow-left');
        }
    }
});
function setSidebarState(value){
    sessionStorage.setItem('sidebarState', value);
}

function clearSidebarState(){
    sessionStorage.removeItem('sidebarState');
}

function collapseSidebar(){
    $('#main-section').addClass('sidebar-collapsed').removeClass('sidebar-expanded');
    $('#toggle-collapse').removeClass('glyphicon-circle-arrow-left').addClass('glyphicon-circle-arrow-right');
}

function expandSidebar(){
    $('#main-section').addClass('sidebar-expanded').removeClass('sidebar-collapsed');
    $('#toggle-collapse').removeClass('glyphicon-circle-arrow-right').addClass('glyphicon-circle-arrow-left');
}

$(function(){

    console.log(windowWidth);

    /** check sessionStorage to expand/collapse sidebar onload **/


    if (sidebarState == "collapsed"){
        collapseSidebar();
    }
    else{



        if( windowWidth < 992 ){ //992 is the value of $screen-md-min in boostrap variables.scss
            $('#main-section').removeClass('sidebar-expanded').addClass('sidebar-collapsed');
            $('#toggle-collapse').removeClass('glyphicon-circle-arrow-left').addClass('glyphicon-circle-arrow-right');
        }
        else{
            if(sidebarState){
            $('#main-section').addClass('sidebar-collapsed').removeClass('sidebar-expanded'); 
            $('#toggle-collapse').removeClass('glyphicon-circle-arrow-left').addClass('glyphicon-circle-arrow-right');
        }
        else{
            $('#main-section').addClass('sidebar-expanded').removeClass('sidebar-collapsed'); 
            $('#toggle-collapse').removeClass('glyphicon-circle-arrow-right').addClass('glyphicon-circle-arrow-left');
        }
        }
        
    }

    


    /** collapse the sidebar navigation **/    
    $('#collapse-nav').click(function(){
        if ( !($('#main-section').hasClass('sidebar-collapsed')) ) { // if sidebar is not yet collapsed
            collapseSidebar();
            setSidebarState('collapsed');
        }
        else{
            expandSidebar();
            clearSidebarState();
        }
        return false;
    })
})