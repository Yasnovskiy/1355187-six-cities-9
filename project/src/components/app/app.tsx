import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

import { Offers } from '../../types/offers';

import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AppProps = {
  offers: Offers,
}

function App({ offers }: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />} >
          <Route index element={<MainScreen offers={offers}/>} />
          <Route path={AppRoute.Room} element={<PropertyScreen offers={offers}/>} />
          <Route path={AppRoute.SignIn} element={<LoginScreen />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          >
          </Route>
        </Route>
        <Route path='*' element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
