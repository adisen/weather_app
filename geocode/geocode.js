const request = require('request');

const googleApiKey = '' // Add Api key from Google

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
    json: true,
  }, (error, response, body) => {
    if(error){
      callback("Unable to connect to server");
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address');
    } else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        longitude: body.results[0].geometry.location.lng,
        latitude: body.results[0].geometry.location.lat
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;