import { Link } from 'react-router-dom';
import FavoriteLocationList from '../../components/favorite-location-list/favorite-location-list';

import { Offers } from '../../types/offers';

type FavoritesPageProps = {
  offers: Offers,
}

function FavoritesPage(props : FavoritesPageProps): JSX.Element {

  const { offers } = props;

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteLocationList offers={offers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className='footer__logo-link' to='/' title='/'>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </>
  );
}

export default FavoritesPage;
