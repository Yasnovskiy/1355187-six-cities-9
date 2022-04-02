import { Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import AuthPage from '../../pages/auth-page/auth-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';


function App(): JSX.Element {

  const { offers } = useAppSelector((state) => state);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path={AppRoute.RoomId} element={<RoomPage />} />
          <Route path={AppRoute.Login} element={<AuthPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
          >
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
