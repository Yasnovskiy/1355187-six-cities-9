import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../store/api-actions';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';
import { getCitySelector } from '../../store/selectors/city-selector';
import { toast } from 'react-toastify';
import { getRandomCity } from '../../utils';
import { setCity } from '../../store/slices/city-slice';

const passwordWarningText = 'Password should contain minimum one letter and one number';

const validatePassword = (password: string) => password.match(/[A-Za-z]/) !== null && password.match(/[0-9]/) !== null;

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
      const authData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      validatePassword(authData.password) ? dispatch(authAction(authData)) : toast.warn(passwordWarningText);
    }
  }

  const [randomCity, setRandomCity] = useState(city);

  useEffect(() => {
    const cityRandom = getRandomCity();
    setRandomCity(cityRandom);
  }, []);

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
              <Link
                to={AppRoute.Root}
                className="locations__item-link"
                onClick={() => dispatch(setCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
