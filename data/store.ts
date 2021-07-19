import { configureStore, Store } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { reducers } from "./slice";

const rootReducers = combineReducers(reducers);

const combineStores = (state, payload) =>
  Object.keys(payload).reduce((accPayload, sliceName) => {
    const slice = payload[sliceName];

    accPayload[sliceName] = Object.keys(slice).reduce((accSlice, stateName) => {
      accSlice[stateName] = slice[stateName] || state[sliceName][stateName];

      return accSlice;
    }, {});

    return accPayload;
  }, {});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return combineStores(state, action.payload);
  }
  return rootReducers(state, action);
};
  
export const store = configureStore({
  reducer
});

const makeStore = (): Store => {
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);

export default makeStore;