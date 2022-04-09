import { useMemo, useState } from 'react';
import { Offer, SortTypeProps } from '../../types/offers';
import clsx from 'clsx';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortMenu from '../../components/sort-menu/sort-menu';
import MainEmptyScreen from '../../components/main-empty-screen/main-empty-screen';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import store from '../../store';
import { fetchOffersAction } from '../../store/api-actions';
import { getCitySelector } from '../../store/selectors/city-selector';
import { getOffersSelector } from '../../store/selectors/offers-selector';

const SORT_TYPE_FUNCTION = {
  default: () => 0,
  byPriceUp: (a: Offer, b: Offer) => a.price - b.price,
  byPriceDown: (a: Offer, b: Offer) => b.price - a.price,
  byRatingDown: (a: Offer, b: Offer) => b.rating - a.rating,
};

function getData(city: string, offers: Offer[], sortingType: SortTypeProps) {
  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  const sortedOffers: Offer[] = [...sortedByCityOffers].sort(SORT_TYPE_FUNCTION[sortingType]);

  const cityLocation = sortedByCityOffers[0]?.city.location;

  return { sortedOffers, cityLocation, points };
}

function MainPage(): JSX.Element {
  const city = useAppSelector(getCitySelector);
  const offers = useAppSelector(getOffersSelector);

  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [sortingType, setSortingType] = useState<SortTypeProps>('default');

  const { sortedOffers, cityLocation, points } = useMemo(() =>
    getData(city, offers, sortingType),
  [sortingType, offers, city],
  );

  store.dispatch(fetchOffersAction());

  return (
    <div className='page page--gray page--main'>
      <Header />

      <main
        className={clsx('page__main', 'page__main--index', {
          'page__main--index-empty': sortedOffers.length === 0,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {sortedOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
                <SortMenu setSort={setSortingType} sortType={sortingType} />
                <OffersList offers={sortedOffers} setActiveOffer={setActiveOffer} type='placeCard' />
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
