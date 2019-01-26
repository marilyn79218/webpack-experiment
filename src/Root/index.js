import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Menu from './Menu';
import AppRoute from './AppRoute';
import store from './store';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Menu />
            <AppRoute />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root;
