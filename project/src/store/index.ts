import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../server/api';
import reducer from './reducers';

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
