import { combineReducers } from 'redux';

export class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducerDict = {};
  }

  dictRegister(name, reducer, path) {
    if (!path || path.length === 0) {
      this._reducerDict[name] = reducer;
    } else {
      let prevPointer = this._reducerDict;

      let nextPathName = path.shift();
      let pointer = this._reducerDict[nextPathName];
      while (path.length > 0) {
        prevPointer = prevPointer[nextPathName];

        nextPathName = path.shift();
        pointer = pointer[nextPathName];
      }
      const legacyReducer = pointer instanceof Function ? { [nextPathName]: pointer } : pointer;
      const nextReducer = {
        ...legacyReducer,
        [name]: reducer,
      };
      prevPointer[nextPathName] = nextReducer;
    }

    console.log('dictRegister 2', this._reducerDict);
    if (this._emitChange) {
      this._emitChange(this.turnToCombinedReducers(this._reducerDict));
    }
  }

  turnToCombinedReducers(reducerDict) {
    const dict = {};
    for (let reducerKey in reducerDict) {
      dict[reducerKey] =
        reducerDict[reducerKey] instanceof Function ?
        reducerDict[reducerKey] :
        this.turnToCombinedReducers(reducerDict[reducerKey]);
    }

    return combineReducers(dict);
  }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;

let pointer;
export const getReducerPath = (parentDict, reducerName) => {
  if (!parentDict[reducerName]) return parentDict;
  else pointer = parentDict[reducerName];

  return getReducerPath(pointer, reducerName);
}
