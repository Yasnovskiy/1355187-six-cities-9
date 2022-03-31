import { useState } from 'react';

import { SortTypeProps } from '../../types/offers';
import { sortName } from '../../const';

const SORT_TYPE = {
  default: 'Popular',
  byPriceUp: 'Price: low to high',
  byPriceDown: 'Price: high to low',
  byRatingDown: 'Top rated first',
};

type SortMenuProps = {
  setSort: (x : SortTypeProps) => void,
  sortType: SortTypeProps,
}

function SortMenu(props: SortMenuProps): JSX.Element {
  const { setSort, sortType } = props;

  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  function handlerClickSortItem (sortItem: SortTypeProps) {
    setSort(sortItem);
    setIsSortMenuOpen(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}>
        {SORT_TYPE[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortMenuOpen ? 'places__options--opened' : ''}`}>
        {isSortMenuOpen && sortName.map((sortItem) => (
          <li key={sortItem} className={`places__option ${sortItem === sortType ? 'places__option--active' : ''}`} onClick={() => handlerClickSortItem(sortItem)} tabIndex={0}>{SORT_TYPE[sortItem]}</li>
        ))}
      </ul>
    </form>
  );
}

export default SortMenu;
