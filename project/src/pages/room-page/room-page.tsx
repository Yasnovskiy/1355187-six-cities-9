import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';

import OffersList from '../../components/offers-list/offers-list';
import Rating from '../../components/rating/rating';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect, useState } from 'react';
import { fetchRoomDataAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import PlaceCardMark from '../../components/place-card-mark/place-card-mark';
import Bookmark from '../../components/bookmark/bookmark';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { LocationOffer } from '../../types/offers';
import { getRoomSelector } from '../../store/selectors/room-selector';
import { getOffersNearbySelector } from '../../store/selectors/offers-nearby-selector';
import NotFoundPage from '../not-found-page/not-found-page';

type Point = {
  id: number;
  location: LocationOffer;
}

function RoomPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const param = useParams();

  const [isDataLoading, setIsDataLoading] = useState(false);

  const featchData = async () => {
    if (!param.id) {
      return;
    }

    await dispatch(fetchRoomDataAction(param.id));
    window.scrollTo(0, 0);

    setIsDataLoading(true);
  };

  useEffect(() => {
    featchData();
  }, [param.id]);

  const room = useAppSelector(getRoomSelector);
  const offersNearby = useAppSelector(getOffersNearbySelector);

  if (!isDataLoading) {
    return <LoadingScreen />;
  }

  if (!room) {
    return <NotFoundPage />;
  }


  const cityLocation = room.city.location;
  const points: Point[] = [...offersNearby, room].map(({ id, location }) => ({ id, location }));

  const {
    id, isFavorite, images, title, rating, isPremium, type, bedrooms, maxAdults, price, goods, description, host,
  } = room;

  const limitedArrayImages = images.slice(0, 6);
  const proActiveClass: string = host.isPro ? 'property__avatar-wrapper--pro' : '';

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          {limitedArrayImages && (
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {limitedArrayImages?.map((item: string) => (
                  <div key={item} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="Place room" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <PlaceCardMark type="room" />}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <Bookmark hotelId={id} isFavorite={isFavorite} type='room' />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <Rating rating={rating} />
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              {goods && (
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((item: string) => (
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {host && (
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${proActiveClass} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    {host.isPro && (
                      <span className="property__user-status">
                        Pro
                      </span>
                    )}
                  </div>
                  {description && (
                    <div className="property__description">
                      <p className="property__text">
                        {description}
                      </p>
                    </div>)}
                </div>)}
              <Reviews />
            </div>
          </div>
          <Map city={cityLocation} points={points} selectedPoint={id} type='room' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} type='placeNearby' />
          </section>
        </div>
      </main>
    </div>

  );
}

export default RoomPage;
