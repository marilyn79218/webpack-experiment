import {
  SET_COUNT,
  ADD_CLASS,
  ADD_ITEM,
} from '../shared/constants';

export const setCountAction = nextCount => ({
  type: SET_COUNT,
  payload: nextCount,
});

export const addClassAction = newClass => ({
  type: ADD_CLASS,
  payload: newClass,
});
export const addItemAction = newItem => ({
  type: ADD_ITEM,
  payload: newItem,
});
