import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;