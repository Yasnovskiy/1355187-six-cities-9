import { combineReducers } from '@reduxjs/toolkit';

import authorizationStatus from './auth-status';
import user from './user-reducer';
import offers from './offers-reducer';
import offersNearby from './offers-nearby-reducer';
import city from './city-reducer';
import room from './room-reducer';
import comments from './comment-reducer';


const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  user: user.reducer,
  offers: offers.reducer,
  offersNearby: offersNearby.reducer,
  city: city.reducer,
  room: room.reducer,
  comments: comments.reducer,
});

export default reducer;
