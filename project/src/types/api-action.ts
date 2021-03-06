import { PlaceCardType } from './reviews';

export type ChangeOfferStatusAction = {
  hotelId: number | undefined,
  newStatus: boolean,
  type: PlaceCardType,
};

export type SendCommentAction = {
  rating: number | null,
  comment: string;
  hotelId: string | undefined;
  restoreFormData: () => void;
  setIsFormLocked: () => void,
};
