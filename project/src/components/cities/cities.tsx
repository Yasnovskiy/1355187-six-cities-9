import { Link } from 'react-router-dom';
import { cityNames } from '../../const';

import { setCity } from '../../store/action';
import { useAppDispatch } from '../../hooks';

function Cities(props: { city: string }): JSX.Element {
  const { city } = props;
  const dispatch = useAppDispatch();

  function handleClick(cityName: string) {
    return () => dispatch(setCity(cityName));
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => {
          const classNameActive = `locations__item-link tabs__item ${cityName === city ? 'tabs__item--active' : ''}`;

          return (
            <li key={cityName} className="locations__item" onClick={handleClick(cityName)}>
              <Link to="/" className={classNameActive}>
                <span>{cityName}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Cities;
