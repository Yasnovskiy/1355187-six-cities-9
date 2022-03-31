import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import { Offer, Offers } from '../../types/offers';
import { getRatingStyle } from '../../utils';
import OffersList from '../../components/offers-list/offers-list';

function RoomPage(props: {offers: Offers}): JSX.Element{
  const param = useParams();
  const paramsId = Number(param.id);

  const offersItem: Offer = paramsId ? props.offers.filter((currentOffer) => currentOffer.id === paramsId)[0] : props.offers[0];

  const city = props.offers[0].city.location;
  const points = props.offers.map(({ id, location }) => ({ id, location }));

  const [isFavorite, setIsFavorite] = useState(offersItem.isFavorite);

  const buttonActiveClass: string = isFavorite ? 'property__bookmark-button--active' : '';

  const proActiveClass: string = offersItem.host.isPro ? 'property__avatar-wrapper--pro' : '';

  return (
    <main className="page__main page__main--property">
      <section className="property">
        {offersItem.images && (
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offersItem.images?.map((item) => (
                <div key={item} className="property__image-wrapper">
                  <img className="property__image" src={item} alt="Place room" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="property__container container">
          <div className="property__wrapper">
            {offersItem.isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offersItem.title}
              </h1>
              <button className={`property__bookmark-button ${buttonActiveClass} button`} type="button" onClick={() => setIsFavorite(!isFavorite)}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: `${getRatingStyle(offersItem.rating)}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offersItem.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offersItem.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offersItem.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offersItem.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offersItem.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            {offersItem.goods && (
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offersItem.goods?.map((item) => (
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {offersItem.host && (
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${proActiveClass} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offersItem.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offersItem.host.name}
                  </span>
                  {offersItem.host.isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                {offersItem.description && (
                  <div className="property__description">
                    <p className="property__text">
                      {offersItem.description}
                    </p>
                  </div>)}
              </div>)}
            <Reviews />
          </div>
        </div>
        <Map city={city} points={points} selectedPoint={offersItem.id} type='room'/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersList offers={props.offers} type='room'/>
        </section>
      </div>
    </main>
  );
}

export default RoomPage;
