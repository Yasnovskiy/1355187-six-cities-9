import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setRoomData} from './room-slice';
import {Offer, RoomDataType} from '../../types/offers';
import { ReducersName } from '../../const';

const offersNearbySlice = createSlice({
  name: ReducersName.offersNearby,
  initialState: [] as Offer[],
  reducers: {
    setOffersNearby: (state, action: PayloadAction<Offer[]>) => {
      state = action.payload;

      return state;
    },
    replaceOfferNearby: (state, action:PayloadAction<Offer>) => {
      const newOffer = action.payload;

      const newState = state.map((offer) => offer.id === newOffer.id ? newOffer : offer);

      return newState;
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

export const {setOffersNearby, replaceOfferNearby} = offersNearbySlice.actions;

export default offersNearbySlice;
