import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import App from '../containers/App';
import AsyncCompHOC from '../shared/hocs/AsyncCompHOC';

const AsyncAbout = AsyncCompHOC(() => import('../components/About'));

const AppRoute = () => (
  <App>
    <Route
      path='/about'
      component={AsyncAbout}
    />
  </App>
);

export default AppRoute;
