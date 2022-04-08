import { Link } from 'react-router-dom';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';
import { AppRoute, Authorization } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';
import { memo } from 'react';

function Header(): JSX.Element {

  const  authorizationStatus  = useAppSelector(getAuthorizationStatusSelector);

  const isAuthorisedUser = authorizationStatus === Authorization.Authorized;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isAuthorisedUser ? <HeaderNavLogged /> : <HeaderNavNotLogged />}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
