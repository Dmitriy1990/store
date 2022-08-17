import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import products from './productsSlice';
import product from './productSlice';
import basket from './basketSlice';

export const store = configureStore({
  reducer: {
    products,
    product,
    basket
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
