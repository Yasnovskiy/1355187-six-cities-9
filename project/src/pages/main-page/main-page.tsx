import { useState } from 'react';
import { Offer, SortTypeProps } from '../../types/offers';

import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import CitiesComponent from '../../components/cities-component/cities-component';
import SortMenu from '../../components/sort-menu/sort-menu';
import MainEmptyScreen from '../../components/main-empty-screen/main-empty-screen';
import { useAppSelector } from '../../hooks';
import HeaderNavLogged from '../../components/header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../../components/header-nav-not-logged/header-nav-not-logged';

const SORT_TYPE_FUNCTION = {
  default: () => 0,
  byPriceUp: (a: Offer, b: Offer) => {
    if (a.price === b.price) {
      return 0;
    }

    return a.price > b.price ? 1 : -1;
  },
  byPriceDown: (a: Offer, b: Offer) => {
    if (a.price === b.price) {
      return 0;
    }

    return a.price < b.price ? 1 : -1;
  },
  byRatingDown: (a: Offer, b: Offer) => {
    if (a.rating === b.rating) {
      return 0;
    }

    return a.rating < b.rating ? 1 : -1;
  },
};

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const { city, offers, authorizationStatus } = useAppSelector((state) => ({
    city: state.city,
    offers: state.offers,
    authorizationStatus: state.authorizationStatus,
  }));

  const [sortingType, setSortingType] = useState<SortTypeProps>('default');

  const sortedByCityOffers = offers.filter((item) => item.city.name === city);

  if (!sortedByCityOffers[0]) {
    return <div>no data yet</div>;
  }
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));

  const sortedOffers: Offer[] = [...sortedByCityOffers].sort(SORT_TYPE_FUNCTION[sortingType]);

  const cityLocation = sortedByCityOffers[0].city.location;

  return (
    <div className='page page--gray page--main'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="#header__logo">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            {authorizationStatus === 'authorized'
              ? <HeaderNavLogged />
              : <HeaderNavNotLogged />}
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${sortedByCityOffers.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent />
        </div>
        <div className="cities">
          {sortedByCityOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedByCityOffers.length} places to stay in {city}</b>
                <SortMenu setSort={setSortingType} sortType={sortingType} />
                <OffersList offers={sortedOffers} setActiveOffer={setActiveOffer} type='main' />
              </section>
              <div className="cities__right-section">
                <Map city={cityLocation} points={points} selectedPoint={activeOffer} type='main' />
              </div>
            </div>
          ) : <MainEmptyScreen />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
