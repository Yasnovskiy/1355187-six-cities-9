import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getOffersNearbySelector = (state: StateType) => state[ReducersName.offersNearby];
