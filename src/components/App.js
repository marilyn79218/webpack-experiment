import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ADD_STUDENT } from '../shared/constants';
import { asyncAddStudentAction } from '../actions';
import studentReducer from '../reducers/studentReducer';
import useReducer from '../hooks/useReducer';

const initState = {
  initStudent: [
    {
      id: 0,
      name: 'Ray',
      age: 10,
    },
  ],
};

const App = ({
  count,
  setCount,
}) => {
  const [inputStudent, setInputStudent] = useState('');

  const { initStudent } = initState;
  const [students, dispatch] = useReducer(studentReducer, initStudent);

  return (
    <>
      Hello from React
      <div>
        <span>Count: { count }</span>
        <button
          onClick={() => setCount(count - 1)}
        >
          --
        </button>
        <button
          onClick={() => setCount(count + 1)}
        >
          ++
        </button>
        <form
          onSubmit={e => {
            e.preventDefault();

            dispatch(asyncAddStudentAction({
              name: inputStudent,
              id: 1,
            }));
            setInputStudent('');
          }}
        >
          <input
            value={inputStudent}
            onChange={e => setInputStudent(e.target.value)}
          />
        </form>
        <p>Student List:</p>
        <ul>
          {
            students.map(student => (
              <li
                key={student.id}
              >
                { student.name }
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App;
