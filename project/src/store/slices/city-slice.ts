import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducersName } from '../../const';

const citySlice = createSlice({
  name: ReducersName.city,
  initialState: 'Paris' as string,
  reducers: {
    setCity: ( state, action:PayloadAction<string> ) => {
      state = action.payload;

      return state;
    },
  },
});

export const { setCity } = citySlice.actions;

export default citySlice;
