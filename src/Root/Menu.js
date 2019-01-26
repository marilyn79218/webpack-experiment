import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <ul>
    <Link
      to='/'
    >
      Home
    </Link>
    <Link
      to='/about'
    >
      About
    </Link>
  </ul>
);

export default Menu;
