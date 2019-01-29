import classesReducer from './classesReducer';
import itemsReducer from './itemsReducer';
import filterReducer from './filterReducer';

import reducerRegistry from '../../shared/utils/storeManager';

reducerRegistry.dictRegister('aboutReducer', {
  classesReducer,
  itemsReducer: {
    itemsReducer,
    filterReducer,
  }
});
