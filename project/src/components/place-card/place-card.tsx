import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'isFavorite' | 'rating' | 'title' | 'type' | 'description' | 'price' | 'previewImage' | 'id'>,
  mouseOverHandler: () => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {isPremium, isFavorite, rating, title, type, description, price, previewImage, id} = props.offer;

  const [isFavorites, setIsFavorite] = useState(isFavorite);

  const buttonActiveClass: string =  isFavorites ? 'place-card__bookmark-button--active' : '';

  const { mouseOverHandler } = props;

  return (
    <article className="cities__place-card place-card" onMouseOver={mouseOverHandler}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to='/' title='/'>
          <img className="place-card__image" src={previewImage} width="260" height="200" id={(id).toString()} alt={description} />
        </Link>
      </div>
      <div className="place-card__info">
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
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} title='/offer'>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
