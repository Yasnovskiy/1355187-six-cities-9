import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatusType } from '../../types/state';
import { successfulAuth, unSuccessfulAuth } from './user-reducer';


const authorizationStatusReducer = createSlice({
  name: 'authorizationStatus',
  initialState: 'unauthorized',
  reducers: {
    setAuthStatus: (state, action:PayloadAction<AuthorizationStatusType>) => {
      state = action.payload;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(successfulAuth, () => 'authorized')
      .addCase(unSuccessfulAuth, () => 'unauthorized');
  },
});

export const { setAuthStatus } = authorizationStatusReducer.actions;

export default authorizationStatusReducer;
