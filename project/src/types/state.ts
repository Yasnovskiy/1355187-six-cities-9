import { Offers } from './offers';
import { store } from '../store';

export type AppState = {
  city: string,
  offers: Offers,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
