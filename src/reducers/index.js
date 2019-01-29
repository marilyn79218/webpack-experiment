import { combineReducers } from 'redux';

import countReducer from './countReducer';

// Nested reducers: 
// ref1: https://stackoverflow.com/questions/36786244/nested-redux-reducers
// ref2: https://gist.github.com/sergiodxa/444b6efdbfa4c604df5b1f1017a61cea
const rootReducer = combineReducers({
  countReducer,
});

export default rootReducer;
