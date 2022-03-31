import { Offer } from './offers';
import  store  from '../store';

export type AppState = {
  city: string,
  offers: Offer[],
}

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AuthorizationStatusType = 'authrized' | 'unauthrized';
