import { ReducersName } from '../../const';
import { StateType } from '../../types/state';

export const getEmailSelector = (state: StateType) => state[ReducersName.user].email;
