import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {

    // Since App component is exported in Module.default,
    // we access it from default property
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('app')
    );
  })
}
