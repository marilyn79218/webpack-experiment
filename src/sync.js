import { prop } from 'ramda';
import moment from 'moment';

performance.mark('sync_START');

const today = moment();
today.format();

const person = {
  name: 'ray',
};
const getName = prop('name');
const name = getName(person);

for (let i=0; i<100000; i++) {
  const j = i;
}

console.log('Im sync.js', performance.now());

performance.mark('sync_END');
performance.measure(
  'MEASURE_sync.js',
  'sync_START',
  'sync_END'
);