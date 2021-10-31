import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>(); // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
