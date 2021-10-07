(function() {
var url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=H44R8CMQJC5PC';
var getCookie = function(cname) {var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++) {var c=ca[i];while(c.charAt(0)==' ') c=c.substring(1);if(c.indexOf(name)!=-1)return c.substring(name.length,c.length);}return '';}

var setCookie=function(cname, cvalue, exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toGMTString();document.cookie=cname+"="+cvalue+"; "+expires;}

if(getCookie('donate-js-alert') === 'true') return false;
  
document.documentElement.classList.add('donate-js-margin');

var Style = document.createElement('style');
Style.textContent = '@font-face {font-family: \'Open Sans\';font-style: normal;font-weight: 400;src: local(\'Open Sans\'), local(\'OpenSans\'), url(http://themes.googleusercontent.com/static/fonts/opensans/v8/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf) format(\'truetype\');}';
var addStyle = function(str) {
    Style.textContent += str;
}

var donateElement = document.createElement('div'),
    donateText = document.createElement('span'),
    donateButton = document.createElement('a'),
    closeButton = document.createElement('img');
    
closeButton.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAp0lEQVQoU3XQuw0CQQyEYUuQbzNECwFtgI4SqIcSQFRAQH4SDdDEH8DFKy2B72HmQJNM8AX2GIax5MgCk2TW3pxcqVyEZd50bBw5qcIyLyrVmXHuSWQDcbYydhRhkVRakqHspsQPVyZkQL9ZTyY0ZyOJKNN9oes0iO4SM+72nwQ2J8/ZbqakJbFXZtyF6KeFrZF4CImscPCbnEUysEIzfZc4CXHWePsA767V/s+hNPoAAAAASUVORK5CIIA=';
closeButton.addEventListener('click', function() {
    donateElement.style.top = '-50px';
    setCookie('donate-js-alert', 'true', 14);
    document.documentElement.classList.remove('donate-js-margin');
}, false);
donateElement.appendChild(closeButton);
donateElement.id = 'donate-element-donate-js';

addStyle('html{transition:.5s ease-in;-webkit-transition:.5s ease-in;-moz-transition:.5s ease-in;}html.donate-js-margin{margin-top:50px;}\
#donate-element-donate-js {position:fixed;left:0;top:0;width:100%;height:50px;background:#56B66A;font-family:Open Sans;text-align:center;line-height:3em;overflow:hidden;cursor:pointer;color:#ececec;font-size:17px;z-index:987654321;transition:all .3s ease-in;-webkit-transition:all .3s ease-in;-moz-transition:all .3s ease-in;}\
#donate-element-donate-js a {text-decoration:none;color:#ececec;background: rgba(255, 255, 255, 0.2);padding:5px 20px;margin:0 5px;box-shadow:1px 2px 3px rgba(0, 0, 0, 0.1);border-radius:50px;transition:.5s;-webkit-transition:.5s;-moz-transition:.5s;}\
#donate-element-donate-js a:hover {box-shadow:0 0 300px rgba(0, 0, 0, .5)}\
#donate-element-donate-js img {position:absolute;top:0;right:0;padding:19px;opacity:0.5;width:12px;transition:.5s;-webkit-transition:.5s;-moz-transition:.5s;}\
#donate-element-donate-js img:hover {opacity:.85;}');

donateButton.textContent = 'Donate';
donateText.innerHTML = 'Help the community stay live donate ' + donateButton.outerHTML + ' through PayPal.';

donateElement.addEventListener('click', function(event) {
    if(!(event.x >= donateElement.offsetWidth - 62)) {
        window.open(url);
    }
}, false);

donateElement.appendChild(donateText);
document.head.appendChild(Style);
document.body.appendChild(donateElement);
})();
