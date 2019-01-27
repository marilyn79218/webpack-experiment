import { ADD_ITEM } from '../../shared/constants';

const initState = {
  items: [
    {
      name: 'item-1',
      id: '123456',
    },
    {
      name: 'item-2',
      id: '090999',
    },
  ],
};

function itemsReducer(state = initState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };
    default:
      return state;
  }
}

export default itemsReducer;
