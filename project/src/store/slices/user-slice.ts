import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducersName } from '../../const';

import { User } from '../../types/reviews';

const DEFAULT_USER = {
  avatarUrl: '',
  email: '',
  id: 0,
  isPro: false,
  name: '',
  token: '',
};

const userSlice = createSlice({
  name: ReducersName.user,
  initialState: DEFAULT_USER,
  reducers: {
    successfulAuth: (state, action:PayloadAction<User>) => {
      state = action.payload;

      return state;
    },
    unSuccessfulAuth: () => DEFAULT_USER,
  },
});

export const { successfulAuth, unSuccessfulAuth } = userSlice.actions;

export default userSlice;
