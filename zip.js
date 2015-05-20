//Connect to Google Geolocater API and get lat and lon with zip code
var https = require('https');
var address = 90405;

var request = https.get("htt://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDhAB6yN4yqFEHb7Vmo30blQP6i5PemN2I", 
  function(response) {
    var body = "";

    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var result = JSON.parse(body);
      //var location = result.results.geometry.location;
      console.log(result.results[0].geometry.location);
    });

    response.on('error', function(e) {
      console.error("Whoops! Looks like you " + e.message);
    });

});





