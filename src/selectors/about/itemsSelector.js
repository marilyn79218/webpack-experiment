import { getReducerPath } from '../../shared/utils/storeManager';

const PARENT_NAME = 'aboutReducer';
const NAME = 'itemsReducer';

export const itemsSelector = state => getReducerPath(state[PARENT_NAME], NAME).items;
