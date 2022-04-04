import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import reducer from './reducers';
import { redirect } from './middleware/redirect';

export const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export default store;
