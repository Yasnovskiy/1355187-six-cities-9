import { Navigate, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const hasAccess = authorizationStatus === 'authorized';

  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
