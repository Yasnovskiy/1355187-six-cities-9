import { SortTypeProps } from './types/offers';

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  NotFound = '/notfound',
  Room = '/offer/',
  RoomId = '/offer/:id',
  Root = '/',
}

export enum Authorization {
  Authorized = 'authorized',
  Unauthorized = 'unauthorized',
  Unknown = 'unknown',
}

export enum APIRoute {
  Comments = '/comments',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
}

export enum ReducersName {
  auth = 'AUTH',
  city = 'CITY',
  comments = 'COMMENTS',
  favorites = 'FAVORITES',
  offersNearby = 'OFFERS_NEARBY',
  offers = 'OFFERS',
  room = 'ROOM',
  user = 'USER',
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

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const sortName: SortTypeProps[] = ['default', 'byPriceUp', 'byPriceDown', 'byRatingDown'];
