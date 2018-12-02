import { prop } from 'ramda';
import moment from 'moment';
require('./style.scss');

const Name = ['Mike', 'Jacky', 'Andy', 'Scars'];
Name.forEach((obj, idx)=> console.log(`${idx} => ${obj}`));

const today = moment();
console.log('moment - today', today.format());

const person = {
  name: 'ray',
};
const getName = prop('name');
const name = getName(person);

console.log('ramda - name', name);


