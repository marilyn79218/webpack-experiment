import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import App from '../containers/App';
import AsyncCompHOC from '../shared/hocs/AsyncCompHOC';

const AsyncAbout = AsyncCompHOC(() => import('../containers/About'));

const AppRoute = () => (
  <Switch>
    <Route exact path='/about' component={AsyncAbout} />
    <Route path='/' component={App} />
  </Switch>
);

export default AppRoute;
