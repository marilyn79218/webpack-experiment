import { useState } from 'react';

const myThunk = dispatch => (action) => {
  if (typeof action === 'function') {
    return action(dispatch);
  }

  return dispatch(action);
}

// ref: https://reactjs.org/docs/hooks-custom.html#useyourimagination
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  const thunkDispatch = myThunk(dispatch);

  return [state, thunkDispatch];
}

export default useReducer;
