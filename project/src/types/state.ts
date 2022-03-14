import { Offer } from './offers';
import { store } from '../store';

export type AppState = {
  city: string,
  offers: Offer[],
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
