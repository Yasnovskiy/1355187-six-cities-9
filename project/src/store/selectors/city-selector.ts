import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getCitySelector = (state: StateType) => state[ReducersName.city];
