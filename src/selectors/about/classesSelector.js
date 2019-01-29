import { getReducerPath } from '../../shared/utils/storeManager';

const PARENT_NAME = 'aboutReducer';
const NAME = 'classesReducer';

// export const classesSelector = state => state[PARENT_NAME][NAME].classes;
export const classesSelector = state => getReducerPath(state[PARENT_NAME], NAME).classes;
