// import { prop } from 'ramda';

performance.mark('async02_START');

// const person = {
//   name: 'ray',
// };
// const getName = prop('name');
// const name = getName(person);

for (let i=0; i<100000; i++) {
  const j = i;
}

console.log('Im async02.js', performance.now());

performance.mark('async02_END');
performance.measure(
  'MEASURE_async02.js',
  'async02_START',
  'async02_END'
);