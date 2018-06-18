const request = require('request');
var tuc = require('temp-units-conv');



var getWeather = (results) => {
  request({
      url: `https://api.darksky.net/forecast/654abc939029bd49f3adc4534c6020fd/${results.latitude},${results.longitude}`,
      json: true
  }, (error, response, body) => {
      if(error){
        console.log('Unable to connect to servers');
      } else {
        //console.log(body);
        console.log(`Address: ${results.address}`);
        console.log(`Summary: ${body.currently.summary}`);
        var cel = tuc.fahrenheitToCelsius(body.currently.temperature);
        console.log(`Temperature: ${cel}`);
      }
  });
};


module.exports = {
  getWeather
}
