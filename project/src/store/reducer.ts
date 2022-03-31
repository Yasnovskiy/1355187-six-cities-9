import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffer } from './action';

import { offers } from '../mock/offers';
import { AppState } from '../types/state';

const initialState: AppState = {
  city: 'Paris',
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
