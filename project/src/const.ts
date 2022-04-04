import { SortTypeProps } from './types/offers';

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  NotFound = '/notfound',
  Room = '/offer/',
  RoomId = '/offer/:id',
  Root = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Comments = '/comments',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const DEFAULT_ROOM_DATA = {
  comments: [],
  offersNearby: [],
  room: null,
};

export const DEFAULT_USER = {
  avatarUrl: '',
  email: '',
  id: 0,
  isPro: false,
  name: '',
  token: '',
};

export const MIN_REVIEW_LENGTH = 50;

export const MAX_STARS_RATING = 5;

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const sortName: SortTypeProps[] = ['default', 'byPriceUp', 'byPriceDown', 'byRatingDown'];

export enum Pins {
  Default = 'pin.svg',
  Active = 'pin-active.svg',
}
