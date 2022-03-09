export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Room = '/offer/:id',
  SignIn = '/login',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Pins {
  Default = 'pin.svg',
  Active = 'pin-active.svg',
}

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
