import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomStateType, RoomDataType } from '../../types/offers';
import { ReducersName } from '../../const';

const roomSlice = createSlice({
  name: ReducersName.room,
  initialState: null as RoomStateType,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomStateType>) => {
      state = action.payload;

      return state;
    },
    setRoomData: (state, action: PayloadAction<RoomDataType>) => {
      state = action.payload.room;

      return state;
    },
  },
});

export const { setRoom, setRoomData } = roomSlice.actions;

export default roomSlice;
