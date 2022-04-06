import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { ReducersName } from '../../const';

const favoritesSlice = createSlice({
  name: ReducersName.favorites,
  initialState: [] as Offer[],
  reducers: {
    setFavorites: (state, action: PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    removeOffer: (state, action: PayloadAction<Offer>) => state
      .filter((offer) => offer.id !== action.payload.id),
  },
});

export const { setFavorites, removeOffer } = favoritesSlice.actions;

export default favoritesSlice;
