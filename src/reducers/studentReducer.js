import { ADD_STUDENT } from '../shared/constants';

function studentReducer(state, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default studentReducer;
