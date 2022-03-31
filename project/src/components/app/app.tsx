import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

import { Offers } from '../../types/offers';

import Layout from '../layout/layout';

import AuthPage from '../../pages/auth-page/auth-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

type AppProps = {
  offers: Offers,
}

function App(offers : AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />} >
          <Route index element={<MainPage offers={offers.offers}/>} />
          <Route path={AppRoute.Room} element={<RoomPage offers={offers.offers} />} />
          <Route path={AppRoute.SignIn} element={<AuthPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage offers={offers.offers} />
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
