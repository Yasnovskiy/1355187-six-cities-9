import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';

export const setCity = createAction<string>('main/setCity');

export const setOffer = createAction<Offer[]>('main/setOffers');
