import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cityReducer = createSlice({
  name: 'city',
  initialState: 'Paris',
  reducers: {
    setCity: (state, action:PayloadAction<string>) => {
      state = action.payload;

      return state;
    },
  },
});

export const { setCity } = cityReducer.actions;

export default cityReducer;
