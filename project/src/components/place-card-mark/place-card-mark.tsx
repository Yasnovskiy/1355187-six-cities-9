import clsx from 'clsx';
import { PlaceCardType } from '../../types/reviews';

// import { PlaceCardType } from '../../types/other-types';

function PlaceCardMark(props: { type: PlaceCardType }) {
  const { type } = props;

  const isTypeRoom = type === 'room';

  return (
    <div className={clsx({
      'place-card__mark': !isTypeRoom,
      'property__mark': isTypeRoom,
    })}
    >
      <span>Premium</span>
    </div>
  );
}

export default PlaceCardMark;
