import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';
import { Page } from '../../types/page';

type OffersListProps = {
  offers: Offers,
  type: Page,
  setActiveOffer?: (id : number | null) => void;
}

function getClassName(type: Page ): string {
  const mapping = {
    main: 'cities__places-list places__list tabs__content',
    room: 'near-places__list places__list',
    favorites: 'favorites__places',
  };
  return mapping[type];
}

function OffersList(props : OffersListProps): JSX.Element {

  const { offers, type, setActiveOffer } = props;

  return (
    <div className={getClassName(type)}>

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
