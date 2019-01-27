import { SET_COUNT } from '../shared/constants';
import reducerRegistry from '../shared/utils/storeManager';

const initState = {
  count: 0,
};

function countReducer(state = initState, action) {
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

reducerRegistry.register('countReducer', countReducer);

export default countReducer;
