
const request = require('request');


var geocodeAddress = (address, callback) => {

    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyDfmx0w4Lkq305DiD6nYdIUiNacoCNEoGs',
        json: true
    }, (error, response, body) => {
        if (error){
          callback('Unable to connect to google servers', null);
        }
        else if( body.status === 'ZERO_RESULTS'){
          callback('Unable to find the address', null);
        }
        else if(body.status === 'OK') {
          callback(null, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
        // console.log(body);
    });
};


module.exports = {
  geocodeAddress
}
