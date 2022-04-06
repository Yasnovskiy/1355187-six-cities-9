import { Dispatch } from '@reduxjs/toolkit';
import { setOffers, replaceOffer } from './slices/offers-slice';
import { replaceOfferNearby } from './slices/offers-nearby-slice';
import { successfulAuth, unSuccessfulAuth } from './slices/user-slice';
import { setRoom, setRoomData } from './slices/room-slice';
import { setComments } from './slices/comment-slice';
import { setFavorites, removeOffer } from './slices/favorites-slice';
import { APIRoute, AppRoute } from '../const';
import { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { errorHandle } from '../services/error-handle';
import { setToken, removeToken } from '../services/token';
import { DEFAULT_ROOM_DATA } from '../const';
import { redirectToRoute } from './action';
import { PlaceCardType } from '../types/reviews';
import { AuthDataType, CommentFormDataType } from '../types/server';
import { StateType } from '../types/state';

const storeActionMapping = {
  'placeCard': replaceOffer,
  'placeNearby': replaceOfferNearby,
  'favorite': removeOffer,
  'room': setRoom,
};

function getStoreAction(type: PlaceCardType) {
  return storeActionMapping[type];
}

export const authAction = (authData: AuthDataType) => (
  nextDispatch: Dispatch,
  getState: () => StateType,
  api: AxiosInstance,
) => {

  toast.promise(api.post(APIRoute.Login, authData)
    .then((response: AxiosResponse) => {
      setToken(response.data.token);
      nextDispatch(successfulAuth(response.data));
      nextDispatch(redirectToRoute(AppRoute.Root));
    })
    .catch((error) => {
      errorHandle(error);
      nextDispatch(unSuccessfulAuth());
    }),
  {
    pending: 'Loading...',
  });
};

export const checkAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Login)
    .then((response: AxiosResponse) => {
      nextDispatch(successfulAuth(response.data));
    })
    .catch((error) => {
      removeToken();
      errorHandle(error);
      nextDispatch(unSuccessfulAuth());
    }),
  {
    pending: 'Loading...',
  });
};

export const changeOfferStatusAction = (hotelId: number, isFavorite: boolean, actionType: PlaceCardType) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    const status = isFavorite ? 1 : 0;
    const path = `${APIRoute.Favorites}/${hotelId}/${status}`;
    toast.promise(api.post(path)
      .then((response: AxiosResponse) => {
        const storeAction = getStoreAction(actionType);
        nextDispatch(storeAction(response.data));
      })
      .catch((error) => {
        errorHandle(error);
      }),
    {
      pending: 'Loading...',
    });
  };

export const fetchFavoritesAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Favorites)
    .then((response: AxiosResponse) => {
      nextDispatch(setFavorites(response.data));
    })
    .catch((error) => {
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const fetchOffersAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Offers)
    .then((response: AxiosResponse) => {
      nextDispatch(setOffers(response.data));
    })
    .catch((error) => {
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const fetchRoomDataAction = (hotelId: string) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    const roomData = DEFAULT_ROOM_DATA;
    toast.promise(api.get(`${APIRoute.Offers}/${hotelId}`)
      .then((resRoom: AxiosResponse) => {
        roomData.room = resRoom.data;
        api.get(`${APIRoute.Offers}/${hotelId}/nearby`)
          .then((resNearby: AxiosResponse) => {
            roomData.offersNearby = resNearby.data;
            api.get(`${APIRoute.Comments}/${hotelId}`)
              .then((resComment: AxiosResponse) => {
                roomData.comments = resComment.data;
                nextDispatch(setRoomData(roomData));
              });
          });
      })
      .catch((error) => {
        errorHandle(error);
        nextDispatch(setRoomData(DEFAULT_ROOM_DATA));
        nextDispatch(redirectToRoute(AppRoute.NotFound));
      }),
    {
      pending: 'Loading...',
    });
  };

export const finishAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.delete(APIRoute.Logout)
    .then(() => {
      removeToken();
      nextDispatch(unSuccessfulAuth());
    })
    .catch((error) => {
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const sendCommentAction = (comment: CommentFormDataType, hotelId: string, restoreFormData: (formData: CommentFormDataType) => void) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    toast.promise(api.post(`${APIRoute.Comments}/${hotelId}`, comment)
      .then((response: AxiosResponse) => {
        nextDispatch(setComments(response.data));
      })
      .catch((error) => {
        errorHandle(error);
        restoreFormData(comment);
      }),
    {
      pending: 'Loading...',
    });
  };
