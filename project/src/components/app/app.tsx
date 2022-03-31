import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import PrivateRoute from '../private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';

import Layout from '../layout/layout';

import AuthPage from '../../pages/auth-page/auth-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { setOffers } from '../../store/reducers/offers-reducer';
import { api } from '../../store';
import { toast } from 'react-toastify';


function App(): JSX.Element {

  const dispatch = useAppDispatch();

  const { offers } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch((nextDispatch, getState) => {
      toast.promise(
        api.get('/hotels')
          .then((response) => {
            nextDispatch(setOffers(response.data));
          }),
        {
          pending: 'Loading...',
          error: 'Network error',
        },
      );
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Room} element={<RoomPage />} />
          <Route path={AppRoute.SignIn} element={<AuthPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          >
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
