import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getAuthorizationStatusSelector = (state: StateType) => state[ReducersName.auth];
