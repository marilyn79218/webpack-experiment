import { combineReducers } from 'redux';

import classesReducer from './classesReducer';
import itemsReducer from './itemsReducer';

import reducerRegistry from '../../shared/utils/storeManager';

const combinedAboutReducer = combineReducers({
  classesReducer,
  itemsReducer,
});

reducerRegistry.register('aboutReducer', combinedAboutReducer);
reducerRegistry.dictRegister('aboutReducer', {
  classesReducer,
  itemsReducer,
});

// export default combinedAboutReducer;
const asyncReducers = {};
export const nestingReducer = (nestedReducerName, nestedReducer, reducerPath) => {
  asyncReducers[nestedReducerName] = nestedReducer;

  reducerRegistry.register('aboutReducer', combineReducers({
    classesReducer,
    itemsReducer,
    ...asyncReducers,
  }));
  reducerRegistry.dictRegister(nestedReducerName, nestedReducer, reducerPath);
}
