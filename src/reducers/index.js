import { combineReducers } from 'redux';

import countReducer from './countReducer';
import aboutReducer from './about';
import filterReducer from './filterReducer';

// Nested reducers: https://stackoverflow.com/questions/36786244/nested-redux-reducers
const rootReducer = combineReducers({
  countReducer,
  aboutReducer,
  filterReducer,
});

export default rootReducer;
