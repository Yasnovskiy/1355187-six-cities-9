import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import type { StateType, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;

