import { prop } from 'ramda';
import moment from 'moment';

performance.mark('preload_start');

const today = moment();
today.format();

const person = {
  name: 'ray',
};
const getName = prop('name');
const name = getName(person);

for (let i=0; i<10000000; i++) {
  const j = i;
}

console.log('Im preload.js', performance.now());

performance.mark('preload_end');
performance.measure(
  'MEASURE_preload.js',
  'preload_start',
  'preload_end'
);
