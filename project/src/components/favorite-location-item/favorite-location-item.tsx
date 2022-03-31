import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';

type FavoriteLocationItemProps = {
  cityName: string,
  offers: Offer[],
}

function FavoriteLocationItem({cityName, offers}: FavoriteLocationItemProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <OffersList offers={offers} type='favorites' />
    </li>
  );
}

export default FavoriteLocationItem;
