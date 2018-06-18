const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather')


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


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else {
    weather.getWeather(results);
  }
});
