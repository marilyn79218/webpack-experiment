import { ADD_STUDENT } from '../../shared/constants';

export const asyncAddStudentAction = newStudent => dispatch => {
  setTimeout(() => {
    const newStudentAction = {
      type: ADD_STUDENT,
      payload: newStudent,
    }
    dispatch(newStudentAction);
  }, 1000);
};
