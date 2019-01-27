import { SET_FILTER } from '../shared/constants';

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

export default filterReducer;
