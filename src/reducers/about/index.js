import { combineReducers } from 'redux';

import classesReducer from './classesReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  classesReducer,
  itemsReducer,
});
