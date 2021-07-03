$(function() {
    var client_loaded = false;
    var address_string = '';
    
  function loadClient() {
    gapi.client.setApiKey('AIzaSyDrurhQDRIWn79rxqXGmzdDHtgBp9szwdI');
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest")
        .then(function() {
          console.log("GAPI client loaded for API");
        }, function(error) {
          console.error("Error loading GAPI client for API");
        });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": address_string,
      "levels": null,
      "roles": null,
      "resource": {}
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          var response_string = '';
          
          var titles = [];
          var offices = response['result']['offices'];
          for (var o = 0; o < offices.length; o++) {
            var name = offices[o].name
            var indices = offices[o].officialIndices;
            for (var i = 0; i < indices.length; i++) {
                titles[indices[i]] = name;
            }
          }
          
          var officials = response['result']['officials'];
          for (var i = 0; i < officials.length; i++) {
            response_string += '<div class="official">';
            response_string += '<img src="';
            response_string += (officials[i].photoUrl ? officials[i].photoUrl : 'http://weclipart.com/gimg/23A2EDFA79A2ACFB/d2c2d56d3d11841dad53415e78524f89.jpg');
            response_string += '" />';
            response_string += '<h3>' + officials[i].name + '</h3>';
            response_string += '<h4>' + titles[i] + '</h4>';
            if (officials[i].emails) {
                response_string += '<div class="email"><a href="mailto:' + officials[i].emails[0] + '">Email</a></div>';
            }
            if (officials[i].phones) {
                response_string += '<div class="phone"><a href="tel:' + officials[i].phones[0] + '">' + officials[i].phones[0] + '</a></div>';
            }
            if (officials[i].urls) {
                response_string += '<div class="url"><a href="' + officials[i].urls[0] + '" target="_blank">Website</a></div>';
            }
            response_string += '</div>';
          }
          
          // $('#response').html(JSON.stringify(response['result']['officials'][0]));
          $('#response').html(response_string);
        }, function(error) {
          console.error("Execute error", error);
        });
  }
  gapi.load("client");
  
  $('form input').focus(function() {
    if (!client_loaded) {
        loadClient();
        client_loaded = true;
    }
  });
  // $('#loadclient').click(loadClient);
  $('#execute').click(function(e) {
    e.preventDefault();
    address_string += $('#form-address').val() + ' ';
    address_string += $('#form-city').val() + ' ';
    address_string += $('#form-state').val() + ' ';
    address_string += $('#form-zip').val() + ' ';
    execute();
    
  });
});