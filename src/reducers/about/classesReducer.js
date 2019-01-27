import { ADD_CLASS } from '../../shared/constants';

const initState = {
  classes: [
    'class-A',
    'class-B',
  ],
};

function classesReducer(state = initState, action) {
  switch (action.type) {
    case ADD_CLASS:
      return {
        ...state,
        classes: [
          ...state.classes,
          action.payload
        ],
      };
    default:
      return state;
  }
}

export default classesReducer;
