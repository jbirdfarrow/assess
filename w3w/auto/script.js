function getLocation() {
  if (navigator.geolocation) {
    // Funktion showPosition aufrufen, wenn Geolocation verfügbar
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  currentPos = position.coords.latitude + "," + position.coords.longitude;

  document.getElementById("google").innerHTML =
    "<a target='_blank' href='https://maps.google.com/maps?q=" +
    currentPos +
    "'>Check on Google Maps</a>";
  
    getWhat3Words(position.coords.latitude, position.coords.longitude);
}

function getWhat3Words(latitude, longitude) {
  what3words.api.convertTo3wa({lat:latitude, lng:longitude}, 'en')
  .then(function(response) {
    console.log("[convertTo3wa]", response);
    
    document.getElementById("w3w").innerHTML =
    "<a target='_blank' href='" +  response['map'] + "'>What3Words = " + response['words'] + "</a>";
    
  });
}

getLocation();