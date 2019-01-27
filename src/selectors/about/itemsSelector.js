const PARENT_NAME = 'aboutReducer';
const NAME = 'itemsReducer';

export const itemsSelector = state => state[PARENT_NAME][NAME].items;
