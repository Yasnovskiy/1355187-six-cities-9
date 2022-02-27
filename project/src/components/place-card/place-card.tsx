import { Link } from 'react-router-dom';
import { CityOffer } from '../../types/offers';

// type PlaceCardsProps = {
//   city: CityOffer;
//   previewImage: string;
//   images: string[];
//   title: string;
//   isFavorite: boolean;
//   isPremium: boolean;
//   rating: number;
//   type: string;
//   bedrooms: number;
//   maxAdults: number;
//   price: number;
//   goods: string[];
//   host: HostOffer;
//   description: string;
//   location: LocationOffer;
//   id: number;
// };

type PlaceCardProps = {
  city: CityOffer;
  previewImage: string;
  isPremium: boolean;
  type: string;
  price: number;
  description: string;
};

function PlaceCard(offer: PlaceCardProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(offer);

  return (
    <article className="cities__place-card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to='/' title='/' >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.description} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{offer.city.name}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
