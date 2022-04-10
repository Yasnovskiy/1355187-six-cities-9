import clsx from 'clsx';

import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offers';
import { PlaceCardType } from '../../types/reviews';

type OffersListProps = {
  offers: Offer[],
  type: PlaceCardType,
  setActiveOffer?: (id : number | null) => void;
}

function OffersList(props : OffersListProps): JSX.Element {

  const { offers, type, setActiveOffer } = props;

  const cardClassName = clsx('places__list', {
    'cities__places-list': type === 'placeCard',
    'tabs__content': type === 'placeCard',
    'near-places__list': type === 'placeNearby',
  });

  return (
    <div className={cardClassName}>

      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          offer={item}
          placeCardType={type}
          mouseOverHandler={setActiveOffer}
        />))}

    </div>
  );
}

export default OffersList;
