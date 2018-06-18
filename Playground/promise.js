// var asyncAdd = (a,b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if(typeof a === 'number' && typeof b === 'number'){
//         resolve(a+b);
//       } else {
//         reject('Couldnt Add');
//       }
//     }, 1500);
//   });
// };
//
//
//
// var some = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey it worked');
//     reject('Hey it didnt work');
//   }, 2500);
// });
//
//
//
// some.then((message) => {
//   console.log(message);
// }, (err) => {
//   console.log(err);
// });
//
// asyncAdd('dsda',7).then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// })

const request = require('request');

var geo = (address) => {
  return new Promise((resolve, reject) => {

    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyDfmx0w4Lkq305DiD6nYdIUiNacoCNEoGs',
        json: true
    }, (error, response, body) => {
        if (error){
          reject('Unable to connect to google servers');
        }
        else if( body.status === 'ZERO_RESULTS'){
          reject('Unable to find the address');
        }
        else if(body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
        // console.log(body);
    });

  });
};


geo('unknown place').then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})
