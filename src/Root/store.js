import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers';
import reducerRegistry from '../shared/utils/storeManager';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// reducerRegistry.setChangeListener(
//   reducers =>
//     store.replaceReducer(combineReducers(reducers))
// );
reducerRegistry.setChangeListener(
  combinedReducers =>
    store.replaceReducer(combinedReducers)
);

export default store;
