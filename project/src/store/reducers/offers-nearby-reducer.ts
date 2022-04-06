import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setRoomData} from './room-reducer';
import {Offer, RoomDataType} from '../../types/offers';

const offersNearbyReducer = createSlice({
  name: 'offersNearby',
  initialState: [] as Offer[],
  reducers: {
    setOffersNearby: (state, action: PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoomData, (state, action: PayloadAction<RoomDataType>) => {
        state = action.payload.offersNearby;
        return state;
      });
  },
});

export const { setOffersNearby } = offersNearbyReducer.actions;

export default offersNearbyReducer;
