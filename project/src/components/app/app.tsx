import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import PrivateRoute from '../private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';
// import { Offers } from '../../types/offers';

import Layout from '../layout/layout';

import AuthPage from '../../pages/auth-page/auth-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
// import { State } from '../../types/state';
import { useAppSelector } from '../../hooks';

// type AppProps = {
//   offers: Offers,
// }

function App(): JSX.Element {

  const {city, offers} = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />} >
          <Route index element={<MainPage offers={offers} city={city} />} />
          <Route path={AppRoute.Room} element={<RoomPage offers={offers} />} />
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
