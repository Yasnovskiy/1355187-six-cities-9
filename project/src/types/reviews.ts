export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Omit<User, 'email' | 'token'>
};

export type Comments = Comment[];

export type MapType = 'room' | 'main';

export type PlaceCardType = 'room' | 'main';

export type PlaceCardListType = PlaceCardType;

export type User = {
    avatarUrl: string,
    email: string,
    id: number,
    isPro: boolean,
    name: string,
    token: string,
};
