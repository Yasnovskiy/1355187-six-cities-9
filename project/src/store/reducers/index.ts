import { combineReducers } from '@reduxjs/toolkit';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import city from './city-reducer';

const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  city: city.reducer,
  offers: offers.reducer,
});

export default reducer;
