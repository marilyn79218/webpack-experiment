const SET_LEFT = 'SET_LEFT';
const SET_RIGHT = 'SET_RIGHT';

const initState = {
  direction: '',
};

function horizonNeckReducer(state = initState, action) {
  switch (action.type) {
    case SET_LEFT:
      return {
        ...state,
        direction: 'LEFT',
      };
    case SET_RIGHT:
      return {
        ...state,
        direction: 'RIGHT',
      };
    default:
      return state;
  }
}

export default horizonNeckReducer;
