import { useState } from 'react';
import { Offer, SortTypeProps } from '../../types/offers';

import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Cities from '../../components/cities/cities';
import SortMenu from '../../components/sort-menu/sort-menu';
import MainEmptyScreen from '../../components/main-empty-screen/main-empty-screen';

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

type MainPageProps = { offers: Offer[] } & { city: string };

function MainPage(props: MainPageProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState(null as number | null);

  const { city, offers } = props;
  const cityLocation = offers[0].city.location;
  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const isOffersListEmpty = sortedByCityOffers.length === 0;
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  const advertsAmount = sortedByCityOffers.length;

  const [sortingType, setSortingType] = useState<SortTypeProps>('default');

  const sortedOffers = [...sortedByCityOffers].sort(SORT_TYPE_FUNCTION[sortingType]);

  return (
    <div className='page page--gray page--main'>
      <main className={`page__main page__main--index ${isOffersListEmpty && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities city={city} />
        </div>
        <div className="cities">
          {!isOffersListEmpty ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{advertsAmount} places to stay in {city}</b>
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
