import { Offer } from '../../types/offers';
import PlaceCard from '../place-card/place-card';
import { Page } from '../../types/page';

type OffersListProps = {
  offers: Offer[],
  type: Page,
  setActiveOffer?: (id : number | null) => void;
}

const COMPONENT_TYPE_TO_CLASSNAME = {
  main: 'cities__places-list places__list tabs__content',
  room: 'near-places__list places__list',
  favorites: 'favorites__places',
};

function OffersList(props : OffersListProps): JSX.Element {

  const { offers, type, setActiveOffer } = props;

  return (
    <div className={COMPONENT_TYPE_TO_CLASSNAME[type]}>

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
