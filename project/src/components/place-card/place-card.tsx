import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CityOffer } from '../../types/offers';

type PlaceCardProps = {
  id: number,
  city: CityOffer;
  previewImage: string;
  isPremium: boolean;
  type: string;
  price: number;
  description: string;
  title: string,
  rating: number,
  isFavorite: boolean,
};

function PlaceCard({offer}: {offer: PlaceCardProps}): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const buttonActiveClass: string =  isFavorite ? 'place-card__bookmark-button--active' : '';

  return (
    <article className="cities__place-card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`} title='/offer'>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" id={(offer.id).toString()} alt={offer.description} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${buttonActiveClass}`} type="button" onClick={() => setIsFavorite(!isFavorite)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
