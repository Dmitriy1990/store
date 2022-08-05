import { configureStore } from '@reduxjs/toolkit';
import products from './productsSlice';
import product from './productSlice';

export const store = configureStore({
  reducer: {
    products,
    product
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
