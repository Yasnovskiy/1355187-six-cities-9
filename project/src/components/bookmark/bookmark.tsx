import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';


import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { changeOfferStatusAction } from '../../store/api-actions';
import { PlaceCardType } from '../../types/reviews';
import { getAuthorizationStatusSelector } from '../../store/selectors/auth-selector';

function Bookmark(props: { hotelId: number, isFavorite: boolean, type: PlaceCardType }): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatusSelector);

  const { hotelId, isFavorite, type } = props;

  const isTypeRoom = type === 'room';

  const navigate = useNavigate();

  function toggleStatus() {
    if (authorizationStatus !== 'authorized') {
      navigate(AppRoute.Login);
    } else {
      const newStatus = !isFavorite;
      dispatch(changeOfferStatusAction(hotelId, newStatus, type));
    }
  }

  const buttonClassName = clsx('button', {
    'place-card__bookmark-button--active button': isFavorite && !isTypeRoom,
    'property__bookmark-button--active button': isFavorite && isTypeRoom,
    'place-card__bookmark-button': !isTypeRoom,
    'property__bookmark-button': isTypeRoom,
  });

  const svgClassName = clsx({
    'place-card__bookmark-icon': !isTypeRoom,
    'property__bookmark-icon': isTypeRoom,
  });

  const width = clsx({ '18': !isTypeRoom, '31': isTypeRoom });
  const height = clsx({ '19': !isTypeRoom, '33': isTypeRoom });

  return (
    <button className={buttonClassName} type="button" onClick={toggleStatus}>
      <svg className={svgClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default Bookmark;
