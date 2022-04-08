import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getOffersSelector = (state: StateType) => state[ReducersName.offers];
