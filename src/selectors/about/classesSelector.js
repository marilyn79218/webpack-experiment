const PARENT_NAME = 'aboutReducer';
const NAME = 'classesReducer';

export const classesSelector = state => state[PARENT_NAME][NAME].classes;
