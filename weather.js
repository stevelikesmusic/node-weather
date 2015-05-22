//Connect to Google Geolocater API and get lat and lon with zip code
var https = require('https');
var address = 90405;

var forecastCallback = function(lat, lng) {
  var url = 'https://api.forecast.io/forecast/9df7ff36d0c74a57d55d88cdcff00bc9/' + lat + ',' + lng;
  var request = https.get(url, function(response) {
    var body = "";
    
    response.on('data', function(chunk) {
      body += chunk;
    });
    
    response.on('end', function() {
      var forecast = JSON.parse(body);
      console.log("Forecast timezone: " + forecast.timezone);
      console.log("Forecast weather: " + forecast.currently.summary);
    });
  });
}

function getForecast(address) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDhAB6yN4yqFEHb7Vmo30blQP6i5PemN2I";
  var request = https.get(url, function(response) {
      var body = "";

      response.on('data', function(chunk) {
        body += chunk;
      });

      response.on('end', function() {
        var result = JSON.parse(body),
            geo = result.results[0],
            location = geo.formatted_address,
            coord = geo.geometry.location,
            latitude = coord.lat,
            longitude = coord.lng;
        
        if (location) {
          forecastCallback(latitude, longitude);
        }
        console.log("Weather for " + location);
        console.log("Latitude: " + latitude + ". and Longitude: " + longitude);
      });

      response.on('error', function(e) {
        console.error("Whoops! Looks like you " + e.message);
      });

  });
}

//getLoc(address);

module.exports.getForecast = getForecast;





