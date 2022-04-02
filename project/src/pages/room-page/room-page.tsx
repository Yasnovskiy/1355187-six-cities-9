import { Link, useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';

import OffersList from '../../components/offers-list/offers-list';
import Rating from '../../components/rating/rating';
import { useAppSelector, useAppDispatch } from '../../hooks';
import NotFoundPage from '../not-found-page/not-found-page';
import { AppRoute } from '../../const';
import HeaderNavLogged from '../../components/header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../../components/header-nav-not-logged/header-nav-not-logged';
import { useEffect } from 'react';
import { fetchRoomDataAction } from '../../store/api-actions';

function RoomPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const param = useParams().id;

  useEffect(() => {
    if (param) {
      dispatch(fetchRoomDataAction(param));
    }
  }, [dispatch, param]);

  const { room, offersNearby, authorizationStatus } = useAppSelector((state) => ({
    room: state.room,
    offersNearby: state.offersNearby,
    authorizationStatus: state.authorizationStatus,
  }));

  if (!room) {
    return <NotFoundPage />;
  }

  const isAuthorisedUser = authorizationStatus === 'authorized';

  const cityLocation = room.city.location;
  const points = [...offersNearby, room].map(({ id, location }) => ({ id, location }));

  const {
    id, isFavorite ,images, title, rating, isPremium, type, bedrooms, maxAdults, price, goods, description, host,
  } = room;

  const proActiveClass: string = host.isPro ? 'property__avatar-wrapper--pro' : '';

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root}>
                <a className="header__logo-link" href="#main">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </Link>
            </div>
            {isAuthorisedUser ? <HeaderNavLogged /> : <HeaderNavNotLogged />}
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          {images && (
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images?.map((item) => (
                  <div key={item} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="Place room" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
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
                    {goods.map((item) => (
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
            <OffersList offers={offersNearby} type='room' />
          </section>
        </div>
      </main>
    </div>

  );
}

export default RoomPage;
