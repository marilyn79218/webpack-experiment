import { prop } from 'ramda';
import moment from 'moment';
import styles from './style.cr.css';
import './style.scss';

import ChickenFakeEyes from './shared/assets/GG.jpg';

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


// To lazy load a component
// https://webpack.js.org/guides/lazy-loading/
// https://github.com/babel/babel-loader/issues/493#issuecomment-336493807
function btnComponent() {
  const button = document.createElement('button');
  button.innerHTML = 'Click me and look at the console!';

  button.onclick = e => import('./print').then(module => {
    var print = module.default;

    print();
  });

  return button;
}
function imgComponent() {
  const img = new Image();
  img.classList.add(styles.chicken);
  img.src = ChickenFakeEyes;

  return img;
}

document.body.appendChild(btnComponent());
document.body.appendChild(imgComponent());

