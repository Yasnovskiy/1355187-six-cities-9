import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import reducer from './slices';

export const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
