import { SET_FILTER } from '../shared/constants';
import reducerRegistry from '../shared/utils/storeManager';

const initState = {
  filter: '',
};

function filterReducer(state = initState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

reducerRegistry.register('filterReducer', filterReducer);

export default filterReducer;
