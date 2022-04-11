import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Offer } from '../../types/offers';
import { PlaceCardType } from '../../types/reviews';

import Rating from '../rating/rating';
import Bookmark from '../bookmark/bookmark';
import PlaceCardMark from '../place-card-mark/place-card-mark';

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'isFavorite' | 'rating' | 'title' | 'type' | 'description' | 'price' | 'previewImage' | 'id'>,
  placeCardType: PlaceCardType,
  mouseOverHandler?: (id: number | null) => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { isPremium, isFavorite, rating, title, type, description, price, previewImage, id } = props.offer;

  const isTypePlaceCard = props.placeCardType === 'placeCard';
  const isTypePlaceNearby = props.placeCardType === 'placeNearby';
  const isTypeFavorite = props.placeCardType === 'favorite';

  const { mouseOverHandler } = props;

  const handleMouseOver = (idU: number | null) => {
    if (mouseOverHandler) {
      mouseOverHandler(idU);
    }
  };

  const articleClass = clsx('place-card', {
    'cities__place-card': isTypePlaceCard,
    'near-places__card': isTypePlaceNearby,
    'favorites__card': isTypeFavorite,
  });

  const imgWrapperClass = clsx('place-card__image-wrapper', {
    'cities__image-wrapper': isTypePlaceCard,
    'near-places__image-wrapper': isTypePlaceNearby,
    'favorites__image-wrapper': isTypeFavorite,
  });

  const infoClass = clsx('place-card__info', {
    'favorites__card-info': isTypeFavorite,
  });

  return (
    <article
      className={articleClass}
      onMouseOver={() => handleMouseOver(id)}
      onMouseOut = {() => handleMouseOver(null)}
    >
      {isPremium && <PlaceCardMark type="placeCard"/>}
      <div className={imgWrapperClass}>
        <Link to='/' title='/'>
          <img className="place-card__image" src={previewImage} width={`${isTypeFavorite ? 150 : 260}`} height={`${isTypeFavorite ? 110 : 200}`} alt={description} />
        </Link>
      </div>
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark hotelId={id} isFavorite={isFavorite} type={props.placeCardType} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <Rating rating={rating}/>
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
