import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Offer } from '../../types/offers';
import { Page } from '../../types/page';

import { getRatingStyle } from '../../utils';

function getClassName(type : Page) {
  const classOptions = {
    main: {
      className: 'cities__place-card',
      wraperImgClassName: 'cities__image-wrapper',
    },
    room: {
      className: 'near-places__card',
      wraperImgClassName: 'near-places__image-wrapper',
    },
    favorites: {
      className: 'favorites__card',
      wraperImgClassName: 'favorites__image-wrapper',
    },
  };

  return classOptions[type];
}

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'isFavorite' | 'rating' | 'title' | 'type' | 'description' | 'price' | 'previewImage' | 'id'>,
  placeCardType: Page,
  mouseOverHandler?: (id: number | null) => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { isPremium, isFavorite, rating, title, type, description, price, previewImage, id } = props.offer;

  const [isFavorites, setIsFavorite] = useState(isFavorite);

  const buttonActiveClass: string = isFavorites ? 'place-card__bookmark-button--active' : '';

  const { mouseOverHandler } = props;

  const handleMouseOver = (idU: number) => {
    if (mouseOverHandler) {
      mouseOverHandler(idU);
    }
  };

  const { className, wraperImgClassName } = getClassName(props.placeCardType);

  const isFavoritesClass = props.placeCardType === 'favorites';

  return (
    <article className={`${className} place-card`} onMouseOver={() => handleMouseOver(id)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${wraperImgClassName} place-card__image-wrapper`}>
        <Link to='/' title='/'>
          <img className="place-card__image" src={previewImage} width={`${isFavoritesClass ? 150 : 260}`} height={`${isFavoritesClass ? 110 : 200}`} id={(id).toString()} alt={description} />
        </Link>
      </div>
      <div className={`${isFavoritesClass ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${buttonActiveClass}`} type="button" onClick={() => setIsFavorite(!isFavorites)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingStyle(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} title={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
