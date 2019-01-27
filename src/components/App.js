import React, { useState } from 'react';

import useReducer from '../hooks/useReducer';
import { asyncAddStudentAction } from '../hooks/student/studentActions';
import { initStudentState, studentReducer } from '../hooks/student/studentReducer';
import { getRandomArbitrary } from '../shared/utils';

const App = ({
  count,
  setCount,
}) => {
  const [inputStudent, setInputStudent] = useState('');

  const { initStudent } = initStudentState;
  const [students, dispatch] = useReducer(studentReducer, initStudent);

  return (
    <>
      <div>
        <h3>Count from Redux Store</h3>
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
        <h3>Local state with useReducer</h3>
        <form
          onSubmit={e => {
            e.preventDefault();

            dispatch(asyncAddStudentAction({
              name: inputStudent,
              id: getRandomArbitrary(),
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
