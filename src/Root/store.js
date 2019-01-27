import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers';
import reducerRegistry from '../shared/utils/storeManager';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

reducerRegistry.setChangeListener(
  reducers =>
    store.replaceReducer(combineReducers(reducers))
);

export default store;
