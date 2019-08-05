import { prop } from 'ramda';
import moment from 'moment';

performance.mark('defer_start');
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

console.log('Im defer.js', performance.now());

performance.mark('defer_end');
performance.measure(
  'MEASURE_defer.js',
  'defer_start',
  'defer_end'
);