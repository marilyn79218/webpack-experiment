import { combineReducers } from 'redux';

export class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducers = {};

    this._reducerDict = {};
  }

  getReducers() {
    return { ...this._reducers };
  }

  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
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
  }

  // TODO: Finish it
  // getCombinedReducers(reducerDict) {
  //   const dict = {};
  //   for (reducerKey in reducerDict) {
  //     if (!(reducerDict[reducerKey] instanceof Function)) {
  //       return getCombinedReducers(reducerDict[reducerKey]);
  //     }
  //     dict[reducerKey] = 
  //       reducerDict[reducerKey] instanceof Function ?
  //         reducerDict[reducerKey] :
  //         getCombinedReducers(reducerDict[reducerKey])
  //   }
  //   return combineReducers(reducerDict);
  // }

  setChangeListener(listener) {
    this._emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
