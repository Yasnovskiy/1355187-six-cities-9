import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { successfulAuth, unSuccessfulAuth } from './user-slice';
import { Authorization, ReducersName } from '../../const';


const authorizationStatusSlice = createSlice({
  name: ReducersName.auth,
  initialState: Authorization.Unknown,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<Authorization>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(successfulAuth, () => Authorization.Authorized)
      .addCase(unSuccessfulAuth, () => Authorization.Unauthorized);
  },
});

export const { setAuthStatus } = authorizationStatusSlice.actions;

export default authorizationStatusSlice;
