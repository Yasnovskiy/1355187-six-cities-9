import { combineReducers } from '@reduxjs/toolkit';

import authorizationStatus from './auth-slice';
import user from './user-slice';
import offers from './offers-slice';
import offersNearby from './offers-nearby-slice';
import city from './city-slice';
import room from './room-slice';
import comments from './comment-slice';
import favorites from './favorites-slice';

import { ReducersName } from '../../const';

const reducer = combineReducers({
  [ReducersName.auth]: authorizationStatus.reducer,
  [ReducersName.user]: user.reducer,
  [ReducersName.offers]: offers.reducer,
  [ReducersName.offersNearby]: offersNearby.reducer,
  [ReducersName.favorites]: favorites.reducer,
  [ReducersName.city]: city.reducer,
  [ReducersName.room]: room.reducer,
  [ReducersName.comments]: comments.reducer,
});

export default reducer;
