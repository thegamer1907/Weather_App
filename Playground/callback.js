const request = require('request');


request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=chennai',
    json: true
}, (error, response, body) => {
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
