import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers, replaceOffer } from './slices/offers-slice';
import { replaceOfferNearby } from './slices/offers-nearby-slice';
import { successfulAuth, unSuccessfulAuth } from './slices/user-slice';
import { setRoom, setRoomData } from './slices/room-slice';
import { setComments } from './slices/comment-slice';
import { setFavorites, removeOffer } from './slices/favorites-slice';
import { APIRoute, AppRoute, ReducersName } from '../const';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { errorHandle } from '../services/error-handle';
import { setToken, removeToken } from '../services/token';
import { DEFAULT_ROOM_DATA } from '../const';
import { redirectToRoute } from './action';
import { PlaceCardType } from '../types/reviews';
import { AuthDataType, CommentFormDataType } from '../types/server';

const storeActionMapping = {
  'placeCard': replaceOffer,
  'placeNearby': replaceOfferNearby,
  'favorite': removeOffer,
  'room': setRoom,
};

function getStoreAction(type: PlaceCardType) {
  return storeActionMapping[type];
}

export const authAction = createAsyncThunk(
  `${ReducersName.user}/logIn`,
  async (authData: AuthDataType, thunkAPI) => {
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const authActionData = await api.post(APIRoute.Login, authData);
          setToken(authActionData.data.token);
          thunkAPI.dispatch(successfulAuth(authActionData.data));
          thunkAPI.dispatch(redirectToRoute(AppRoute.Root));
        } catch (error) {
          errorHandle(error);
          thunkAPI.dispatch(unSuccessfulAuth());
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const checkAuthAction = createAsyncThunk(
  `${ReducersName.user}/checkAuthStatus`,
  async (_arg ,thunkAPI) => {
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const { data } = await api.get(APIRoute.Login);

          thunkAPI.dispatch(successfulAuth(data));
        } catch {
          removeToken();
          thunkAPI.dispatch(unSuccessfulAuth());
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const changeOfferStatusAction = createAsyncThunk(
  `${ReducersName.user}/checkAuthStatus`,
  async ( hotelId: number, isFavorite: boolean, actionType: PlaceCardType, thunkAPI) => {
    const status = isFavorite ? 1 : 0;
    const path = `${APIRoute.Favorites}/${hotelId}/${status}`;
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const { data } = await api.post(path);

          const storeAction = getStoreAction(actionType);
          thunkAPI.dispatch(storeAction(data));
        } catch(error) {
          errorHandle(error);
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  `${ReducersName.favorites}/fetchFavorites`,
  async (_arg ,thunkAPI) => {
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const { data } = await api.get(APIRoute.Favorites);

          thunkAPI.dispatch(setFavorites(data));
        } catch(error) {
          errorHandle(error);
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const fetchOffersAction = createAsyncThunk(
  `${ReducersName.favorites}/fetchOffers`,
  async (_arg ,thunkAPI) => {
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const { data } = await api.get(APIRoute.Offers);

          thunkAPI.dispatch(setOffers(data));
        } catch(error) {
          errorHandle(error);
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const fetchRoomDataAction = createAsyncThunk(
  `${ReducersName.room}/fetchRoomData`,

  async (hotelId: string, thunkAPI) => {
    const roomData = DEFAULT_ROOM_DATA;
    const api = thunkAPI.extra as AxiosInstance;

    await toast.promise(
      async () => {

        try {
          const resRoom = await api.get(`${APIRoute.Offers}/${hotelId}`);
          roomData.room = resRoom.data;

          const resNearby = await api.get(`${APIRoute.Offers}/${hotelId}/nearby`);
          roomData.offersNearby = resNearby.data;

          const resComment = await api.get(`${APIRoute.Comments}/${hotelId}`);
          roomData.comments = resComment.data;

          thunkAPI.dispatch(setRoomData(roomData));

        } catch (error) {
          errorHandle(error);
          thunkAPI.dispatch(setRoomData(DEFAULT_ROOM_DATA));
          thunkAPI.dispatch(redirectToRoute(AppRoute.NotFound));
        }
      },
      {
        pending: 'Loading...',
      },
    );
  },
);

export const finishAuthAction = createAsyncThunk(
  `${ReducersName.favorites}/fetchOffers`,
  async (_arg ,thunkAPI) => {
    const api = thunkAPI.extra as AxiosInstance;

    try {
      await toast.promise( api.delete(APIRoute.Logout), {pending: 'Loading...'});
      removeToken();
      thunkAPI.dispatch(unSuccessfulAuth());
      thunkAPI.dispatch(redirectToRoute(AppRoute.Root));
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const sendCommentAction = createAsyncThunk(
  `${ReducersName.favorites}/changeOfferFavoriteStatus`,
    async ( {rating, comment }: CommentFormDataType, hotelId: string, restoreFormData: (formData: CommentFormDataType) => void , thunkAPI) => {

    const api = thunkAPI.extra as AxiosInstance;
    try {

      const {data} = await toast.promise(api.post(`${APIRoute.Comments}/${hotelId}`, {rating, comment }),
        {
          pending: 'Loading...',
        });

      thunkAPI.dispatch(setComments(data));

    } catch (error) {
      errorHandle(error);
      restoreFormData({rating, comment });
    }
  },
);
