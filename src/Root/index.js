import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRoute from './AppRoute';
import store from './store';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppRoute />
        </Router>
      </Provider>
    )
  }
}

export default Root;
