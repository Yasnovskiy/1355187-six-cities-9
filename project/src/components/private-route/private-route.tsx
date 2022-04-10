import { Navigate, RouteProps } from 'react-router-dom';
import { Authorization } from '../../const';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatusSelector);

  if (authorizationStatus === Authorization.Unknown) {
    return <LoadingScreen />;
  }

  const hasAccess = authorizationStatus === Authorization.Authorized;

  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
