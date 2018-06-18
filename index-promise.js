const yargs = require('yargs');
const axios = require('axios');
const tuc = require('temp-units-conv');

const argv = yargs
            .options({
              a: {
                demand: true,
                alias: 'address',
                describe: 'Address to fetch weather for',
                string: true
              }
            })
            .help()
            .alias('help', 'h')
            .argv;

var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(argv.a) + '&key=AIzaSyDfmx0w4Lkq305DiD6nYdIUiNacoCNEoGs';

axios.get(url).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address')
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var wurl = `https://api.darksky.net/forecast/654abc939029bd49f3adc4534c6020fd/${lat},${lng}`;
  console.log('Address: ',response.data.results[0].formatted_address);

  return axios.get(wurl);

}).then((response) => {
  console.log(`Summary: ${response.data.currently.summary}`);
  var cel = tuc.fahrenheitToCelsius(response.data.currently.temperature);
  console.log(`Temperature: ${cel}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to servers');
  }
  else {
    console.log('Error! Please Try Again');
  }
});
