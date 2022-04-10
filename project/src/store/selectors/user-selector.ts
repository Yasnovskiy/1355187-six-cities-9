import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getUserSelector = (state: StateType) => state[ReducersName.user];
