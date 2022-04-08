import { SyntheticEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../store/api-actions';
import LocationLink from '../../components/location-link/location-link';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';
import { getCitySelector } from '../../store/selectors/city-selector';

function AuthPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const AuthorizationStatus = useAppSelector(getAuthorizationStatusSelector);
  const city = useAppSelector(getCitySelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthorizationStatus === 'authorized') {
      navigate(AppRoute.Root);
    }
  }, [AuthorizationStatus, navigate]);


  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    if (evt.target instanceof HTMLFormElement) {
      const formData = new FormData(evt.target);
      const email = formData.get('email');
      const password = formData.get('password');
      dispatch(authAction({ email, password }));
    }
  }
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <LocationLink cityName={city as string} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
