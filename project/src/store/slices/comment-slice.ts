import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setRoomData } from './room-slice';
import { Comment, RoomDataType} from '../../types/offers';
import { ReducersName } from '../../const';

const commentsSlice = createSlice({
  name: ReducersName.comments,
  initialState: [] as Comment[],
  reducers: {
    setComments: ( state, action:PayloadAction<Comment[]> ) => {
      state = action.payload;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoomData, ( state, action: PayloadAction<RoomDataType> ) => {
        state = action.payload.comments;

        return state;
      });
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice;
