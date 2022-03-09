/* eslint-disable no-console */
import { useState } from 'react';
import {  Offers } from '../../types/offers';

import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Cities from '../../components/cities/cities';

type MainPageProps = { offers: Offers } & {city: string};

function MainPage( props : MainPageProps): JSX.Element {
  const [active, setActive] = useState(null as number | null);

  const { city, offers } = props;
  const cityLocation = offers[0].city.location;
  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  const advertsAmount = sortedByCityOffers.length;

  console.log(sortedByCityOffers);
  return (
    <div className={`page page--gray page--main ${active}`} >
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Cities city={city} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{advertsAmount} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={sortedByCityOffers} type='main' setActiveOffer={setActive}/>
            </section>
            <div className="cities__right-section">
              <Map city={cityLocation} points={points} selectedPoint={active} type='main'/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
