import { prop } from 'ramda'; // 0.26.1
import { oldRayMethod as rayMethod } from 'old-ramda-dependency';
import { oldRayMethod2 as rayMethod2 } from 'old-ramda-dependency-2';
// import moment from 'moment';

// const today = moment();

const person = {
  name: 'ray',
};
const getName = prop('name');
const name = getName(person);

console.log('ramda - name', name);
console.log('old ramda - oldRayMethod', rayMethod);
console.log('old ramda 2 - oldRayMethod2', rayMethod2);
