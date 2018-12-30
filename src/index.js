import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./Root', () => {

    // Since App component is exported in Module.default,
    // we access it from default property
    const NextRoot = require('./Root').default;
    ReactDOM.render(
      <NextRoot />,
      document.getElementById('app')
    );
  })
}
