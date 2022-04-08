import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getCommentsSelector = (state: StateType) => state[ReducersName.comments];
