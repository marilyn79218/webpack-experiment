import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import App from '../containers/App';
import AsyncCompHOC from '../shared/hocs/AsyncCompHOC';

const AppRoute = () => (
  <Switch>
    <Route exact path='/about'
      component={
        AsyncCompHOC(
          () => import('../containers/About'),
          () => import('../reducers/about'),
        )
      }
    />
    <Route path='/' component={App} />
  </Switch>
);

export default AppRoute;
