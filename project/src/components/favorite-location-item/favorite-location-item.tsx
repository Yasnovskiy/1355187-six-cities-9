import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types/offers';
import LocationLink from '../location-link/location-link';

type FavoriteLocationItemProps = {
  cityName: string,
  offers: Offer[],
}

function FavoriteLocationItem({cityName, offers}: FavoriteLocationItemProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <LocationLink cityName={cityName}/>
        </div>
      </div>
      <OffersList offers={offers} type='favorite' />
    </li>
  );
}

export default FavoriteLocationItem;
