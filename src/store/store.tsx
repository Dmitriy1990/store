import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import products from './productsSlice';
import product from './productSlice';
import basket from './basketSlice';

const reducer = {
  products,
  product,
  basket
};

export const store = configureStore({
  reducer
});

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
