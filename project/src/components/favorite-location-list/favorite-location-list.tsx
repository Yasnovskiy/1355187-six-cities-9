import { Offers, Offer } from '../../types/offers';
import FavoriteLocationItem from '../favorite-location-item/favorite-location-item';

type FavoriteLocationListProps = {
  offers: Offers,
}

function FavoriteLocationList(props: FavoriteLocationListProps): JSX.Element {
  const { offers } = props;

  const sortedOffers = offers.reduce((acc: { [cityName: string]: Offers }, offer: Offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);

    return acc;
  }, {});

  const locationsData = Object.keys(sortedOffers).sort()
    .map((cityName: string) => ({ cityName, offers: sortedOffers[cityName] }));

  return (
    <ul className="favorites__list">

      {locationsData.map((location) => (
        <FavoriteLocationItem key={location.cityName} cityName={location.cityName} offers={location.offers} />
      ))}
    </ul>
  );
}

export default FavoriteLocationList;
