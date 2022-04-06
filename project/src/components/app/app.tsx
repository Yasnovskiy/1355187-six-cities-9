import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AppRoute, ReducersName } from '../../const';
import { useAppSelector } from '../../hooks';

import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import AuthPage from '../../pages/auth-page/auth-page';
import MainPage from '../../pages/main-page/main-page';
import RoomPage from '../../pages/room-page/room-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingScreen from '../loading-screen/loading-screen';


function App(): JSX.Element {

  const authStatus = useAppSelector((state) => state[ReducersName.auth]);

  if (authStatus === 'unknown') {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path={AppRoute.RoomId} element={<RoomPage />} />
          <Route path={AppRoute.Login} element={<AuthPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesPage />
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
