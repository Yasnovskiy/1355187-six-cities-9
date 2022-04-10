import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getFavoritesSelector = (state: StateType) => state[ReducersName.favorites];
