import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route
            path={AppRoute.Main}
            element={<MainScreen offersCount={offersCount} />}
          >
          </Route>
          <Route
            path={AppRoute.Room}
            element={<PropertyScreen />}
          >
          </Route>
          <Route
            path={AppRoute.SignIn}
            element={<LoginScreen />}
          >
          </Route>
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
        <Route
          path='*'
          element={<NotFoundScreen />}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
