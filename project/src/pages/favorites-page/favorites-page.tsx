import { useLayoutEffect } from 'react';

import clsx from 'clsx';

import { ReducersName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';

import Header from '../../components/header/header';
import FavoriteLocationList from '../../components/favorite-location-list/favorite-location-list';
import FavoritesEmptyScreen from '../../components/favorites-empty-screen/favorites-empty-screen';

function FavoritesPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state[ReducersName.favorites]);

  const isFaviritesEmpty = offers.length === 0;

  useLayoutEffect(() => {
    dispatch(fetchFavoritesAction);
  }, [dispatch]);

  const mainClassName = clsx('page__main', 'page__main--favorites', {
    'page__main--favorites-empty': isFaviritesEmpty,
  });

  return (
    <>
      <Header />
      <main className={mainClassName}>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {isFaviritesEmpty ?
              <FavoritesEmptyScreen /> :
              <FavoriteLocationList offers={offers} />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </>
  );
}

export default FavoritesPage;
