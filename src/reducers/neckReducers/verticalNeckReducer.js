const SET_UP = 'SET_UP';
const SET_DOWN = 'SET_DOWN';

const initState = {
  direction: '',
};

function verticalNeckReducer(state = initState, action) {
  switch (action.type) {
    case SET_UP:
      return {
        ...state,
        direction: 'UP',
      };
    case SET_DOWN:
      return {
        ...state,
        direction: 'DOWN',
      };
    default:
      return state;
  }
}

export default verticalNeckReducer;
