console.log('Starting App');

setTimeout(() => {
  console.log('Inside of callback');
}, 2001);

setTimeout(() => {
  console.log('Second Timeout');
}, 2000);

console.log('Finishing Up');
