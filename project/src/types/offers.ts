import { User } from './reviews';

export type LocationOffer = {
  latitude: number,
  longitude: number,
  zoom: number,
};

export type CityOffer = {
  name: string,
  location: LocationOffer,
};

export type HostOffer = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string,
};

export type Offer = {
  city: CityOffer,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: HostOffer,
  description: string,
  location: LocationOffer,
  id: number,
};

export type RoomStateType = Offer | null;

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Omit<User, 'email' | 'token'>,
}

export type RoomDataType = {
  room: RoomStateType,
  offersNearby: Offer[];
  comments: Comment[];
}

export type Point = Pick<Offer, 'id' | 'location' >;

export type SortTypeProps = 'default' | 'byPriceUp' | 'byPriceDown' | 'byRatingDown';
