import { cityNames, ReducersName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { setCity } from '../../store/slices/city-slice';

function CitiesList() {
  const city  = useAppSelector((state) => state[ReducersName.city]);

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cityNames.map((cityName) => {

        function handleClick() {
          return () => dispatch(setCity(cityName));
        }

        const classNameActive = `locations__item-link tabs__item ${cityName === city ? 'tabs__item--active' : ''}`;

        return (
          <li key={cityName} className="locations__item" onClick={handleClick()}>
            <span className={classNameActive}>
              {cityName}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
