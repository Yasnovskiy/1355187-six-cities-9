import { DEFAULT_USER } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/reviews';


const userReducer = createSlice({
  name: 'user',
  initialState: DEFAULT_USER,
  reducers: {
    successfulAuth: (state, action:PayloadAction<User>) => {
      state = action.payload;

      return state;
    },
    unSuccessfulAuth: () => DEFAULT_USER,
  },
});

export const {successfulAuth, unSuccessfulAuth} = userReducer.actions;

export default userReducer;
