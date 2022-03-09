import OffersList from '../offers-list/offers-list';
import { Offers } from '../../types/offers';

type FavoriteLocationItemProps = {
  cityName: string,
  offers: Offers,
}

function FavoriteLocationItem({cityName, offers}: FavoriteLocationItemProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <OffersList offers={offers} type='favorites' />
    </li>
  );
}

export default FavoriteLocationItem;
