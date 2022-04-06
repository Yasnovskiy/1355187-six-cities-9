import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { ReducersName } from '../../const';

const offersSlice = createSlice({
  name: ReducersName.offers,
  initialState: [] as Offer[],
  reducers: {
    setOffers: ( state, action: PayloadAction<Offer[]> ) => {
      state = action.payload;

      return state;
    },
    replaceOffer: ( state, action:PayloadAction<Offer> ) => {
      const newOffer = action.payload;

      const newState = state.map((offer) => offer.id === newOffer.id ? newOffer : offer);

      return newState;
    },
  },
});

export const {setOffers, replaceOffer} = offersSlice.actions;

export default offersSlice;
