import {
  SET_COUNT,
  ADD_STUDENT,
} from '../shared/constants';

export const setCountAction = nextCount => ({
  type: SET_COUNT,
  payload: nextCount,
});

export const asyncAddStudentAction = newStudent => dispatch => {
  setTimeout(() => {
    const newStudentAction = {
      type: ADD_STUDENT,
      payload: newStudent,
    }
    dispatch(newStudentAction);
  }, 1000);
};
