import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { AuthorizationStatus } from '../const';

export const setCity = createAction<string>('main/setCity');

export const setOffer = createAction<Offer[]>('main/setOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

