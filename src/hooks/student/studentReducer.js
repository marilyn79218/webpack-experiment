import { ADD_STUDENT } from '../../shared/constants';

export const initStudentState = {
  initStudent: [
    {
      id: 0,
      name: 'Ray',
      age: 10,
    },
  ],
};

export function studentReducer(state, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload];
    default:
      return state;
  }
}
