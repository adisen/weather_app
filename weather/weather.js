const request = require('request');

let getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/9e792fa1f9efe01ec0e7ba26312e13bd/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Forecast server.');
    } else if(response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if(!error && response.statusCode === 200) {

      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  })
};

module.exports.getWeather = getWeather;