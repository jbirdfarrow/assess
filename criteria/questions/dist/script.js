window.toggleSiteSel = function() {
    var body = document.querySelector('body');
    //console.log(body.getAttributeNode('class'))
    //console.log(getMethods(body.getAttributeNode('class')));
    //console.log(getProperties(body));
    if(document.querySelectorAll('body.stacked').length > 0) {
      body.className = (body.className+'').replace('stacked','');
    } else {
      body.className += ' stacked';
    }
};
window.switchPrev = function() {
    var siteContainer = document.querySelectorAll('.siteContainer')[0];
    var sites = document.querySelectorAll('.siteContainer iframe');
    siteContainer.appendChild(sites[0]);
};
window.switchNext = function() {
    var siteContainer = document.querySelectorAll('.siteContainer')[0];
    var sites = document.querySelectorAll('.siteContainer iframe');
    siteContainer.insertBefore(sites[sites.length-1],sites[0]);
};
window.getMethods = function(obj) {
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    return res;
};
window.getProperties = function(obj) {
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] != "function") {
            res.push(m)
        }
    }
    return res;
};