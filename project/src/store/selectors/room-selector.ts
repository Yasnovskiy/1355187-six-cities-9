import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getRoomSelector = (state: StateType) => state[ReducersName.room];
