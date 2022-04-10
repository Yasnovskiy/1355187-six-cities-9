import { Link } from 'react-router-dom';
import { setCity } from '../../store/slices/city-slice';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';

function LocationLink(props: { cityName: string }) {
  const dispatch = useAppDispatch();
  const { cityName } = props;

  function handleClick() {
    dispatch(setCity(cityName));
  }

  return (
    <Link to={AppRoute.Root} onClick={handleClick}>
      <div className="locations__item-link">
        <span>{cityName}</span>
      </div>
    </Link>
  );
}

export default LocationLink;
