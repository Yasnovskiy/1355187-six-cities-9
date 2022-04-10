import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { finishAuthAction } from '../../store/api-actions';
import { getEmailSelector } from '../../store/selectors/email-selector';

function HeaderNavLogged(): JSX.Element {
  const dispatch = useAppDispatch();

  const email = useAppSelector(getEmailSelector);

  function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(finishAuthAction());
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#nav-link" onClick={handleClick}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavLogged;
