import React, { useState } from 'react';

import { getRandomArbitrary } from '../shared/utils';
import { nestingReducer } from '../reducers/about';

const About = ({
  classes,
  addClass,
  items,
  addItem,
}) => {
  const [inputItem, setInputItem] = useState('');
  const submitItem = e => {
    e.preventDefault();

    addItem({
      name: inputItem,
      id: getRandomArbitrary().toString(),
    });
    setInputItem('');
  }

  const [inputClassName, setInputClassName] = useState('');
  const submitClassName = e => {
    e.preventDefault();

    addClass(inputClassName);
    setInputClassName('');
  }

  return (
    <div>
      <h5>Click here to load filter reducer</h5>
      <button
        onClick={() => {
          return import('../reducers/filterReducer')
            .then(({ default: filterReducer }) =>
              nestingReducer('filterReducer', filterReducer)
            )
        }}
      >
        Load
      </button>
      Nested reducer store
      <form
        onSubmit={submitClassName}
      >
        <input
          value={inputClassName}
          onChange={e => setInputClassName(e.target.value)}
        />
      </form>
      <div>
        Classes:
      </div>
      <ul>
        {
          classes.map((className, index) => (
            <li
              key={index}
            >
              { className }
            </li>
          ))
        }
      </ul>
      <form
        onSubmit={submitItem}
      >
        <input
          value={inputItem}
          onChange={e => setInputItem(e.target.value)}
        />
      </form>
      <div>
        Items:
      </div>
      <ul>
        {
          items.map(item => (
            <li
              key={item.id}
            >
              { item.name }
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default About;
